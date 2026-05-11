/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommonResult } from '~/types/common/api.type'
import type { UnaryCall } from '@protobuf-ts/runtime-rpc'
import i18n from '~/locales/i18n'
import { API_ERROR_MESSAGES } from '~/locales/api-error-messages'
import { authApi } from '~/apis/auth.api'
import { apisAsync } from 'ejsc-ma-api'

// ===== CONFIG =====
const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// ===== REFRESH STATE =====
let refreshPromise: Promise<string | null> | null = null

// ===== HANDLE RESPONSE =====
export const handleResponse = <T>(response: CommonResult, defaultValue: T): T => {
    try {
        if (response.statusCode === 200 || response.statusCode === 201) {
            if (!response.data) return defaultValue



            try {
                return JSON.parse(response.data) as T
            } catch {
                return response.data as T
            }
        }

        // Sử dụng hệ thống lỗi động mới
        const errorInfo = API_ERROR_MESSAGES[response.messageCode || 'AN_UNEXPECTED_ERROR_OCCURRED'] as { key: string; fallback?: string };
        const errorMessage = i18n.t(errorInfo.key, errorInfo.fallback || errorInfo.key);

        throw {
            statusCode: response.statusCode,
            messageCode: response.messageCode,
            message: errorMessage,
            details: response.error || null
        }

    } catch (error) {
        console.error('handleResponse -> error', error)
        throw error
    }
}

// ===== REFRESH TOKEN =====
const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const { data: refreshToken } = await apisAsync.getStorage({ key: REFRESH_TOKEN_KEY })
        if (!refreshToken) return null

        const res = await authApi.refreshToken?.({ refreshToken: refreshToken as unknown as string })

        const json = handleResponse<any>(
            res as unknown as CommonResult,
            {}
        )

        const newAccessToken = json?.accessToken
        const newRefreshToken = json?.refreshToken

        if (!newAccessToken) return null

        await apisAsync.setStorage({ key: ACCESS_TOKEN_KEY, data: newAccessToken })

        if (newRefreshToken) {
            await apisAsync.setStorage({ key: REFRESH_TOKEN_KEY, data: newRefreshToken })
        }

        return newAccessToken
    } catch (error) {
        console.error('refreshAccessToken error:', error)
        return null
    }
}

// ===== MAIN EXECUTE API =====
export const executeApiQuery = async <
    TRequest extends object,
    TResponse extends object,
    T
>({
    clientMethod,
    request,
    defaultValue,
    withAuth = true,
    extraMeta = {}
}: {
    clientMethod: (request: TRequest, options: { meta: Record<string, string> }) => UnaryCall<TRequest, TResponse>
    request: TRequest
    defaultValue: T
    withAuth?: boolean
    extraMeta?: Record<string, string>
}): Promise<T> => {
    const callApi = async (token?: string, isRetry = false) => {
        let activeToken: string | undefined = token;
        if (isRetry) {
            const { data } = await apisAsync.getStorage({ key: ACCESS_TOKEN_KEY });
            activeToken = data as unknown as string;
        }

        const metadata: Record<string, string> = {
            ...(activeToken ? { Authorization: `Bearer ${activeToken}` } : {}),
            ...extraMeta
        }

        const unaryCall = clientMethod(request, { meta: metadata })
        console.log(`[API Request]`, { request, metadata });
        const response = await unaryCall.response
        console.log(`[API Response]`, response);

        try {
            return handleResponse<T>(response as unknown as CommonResult, defaultValue)
        } catch (err: any) {
            // gắn flag để tránh loop
            if (isRetry) {
                err.__retried = true
            }
            throw err
        }
    }

    try {
        console.log(`[API] Fetching token from native storage...`);
        const { data: token } = await apisAsync.getStorage({ key: ACCESS_TOKEN_KEY })
        return await callApi((token as unknown as string) || undefined)
    } catch (error: any) {
        const statusCode = error?.statusCode

        // Không phải auth error hoặc đã retry rồi
        if (statusCode !== 401 || !withAuth || error?.__retried) {
            throw error
        }

        try {
            // ===== CHỈ REFRESH 1 LẦN =====
            if (!refreshPromise) {
                refreshPromise = refreshAccessToken().finally(() => {
                    refreshPromise = null
                })
            }

            const newToken = await refreshPromise

            if (!newToken) {
                throw new Error('Refresh token failed')
            }

            //  retry với token mới
            return await callApi(newToken, true)
        } catch (refreshError) {
            console.error('Refresh flow failed:', refreshError)

            // ===== LOGOUT =====
            await apisAsync.removeStorage({ key: ACCESS_TOKEN_KEY })
            await apisAsync.removeStorage({ key: REFRESH_TOKEN_KEY })

            throw refreshError
        }
    }
}
