import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { StringValue, BoolValue } from './proto_new/Utils/google/protobuf/wrappers';
import { executeApiQuery } from '~/utils/api.util';
import {
    LoginRequest,
    RegisterRequest,
    ActivateAccountRequest,
    ReSendOTPRequest,
    LogoutRequest,
    ResetPasswordRequest,
    VerifyOTPRequest,
    RefreshTokenRequest
} from './proto_new/UserService/Commands/user_auth_command';
import type {
    ActivateAccountRequestType,
    LoginRequestType,
    RegisterRequestType,
    ResendOtpRequestType
} from '~/types/auth/requests/auth.req.type';
import { UserAuthCommandClient } from './proto_new/UserService/Commands/user_auth_command.client';
import { createStringValue } from '~/apis/common/common';

const transport = new GrpcWebFetchTransport({
    baseUrl: `https://8a5da52ed126447d359e70c05721a8aa.homebooking.global/home-booking/command/account`
});

const AccountCommandClient = new UserAuthCommandClient(transport);

export const authApi = {
    login: async (body: LoginRequestType) => {
        const request = LoginRequest.create({});
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.Password) request.password = StringValue.create({ value: body.Password });

        return executeApiQuery({
            clientMethod: AccountCommandClient.login.bind(AccountCommandClient),
            request,
            defaultValue: null,
            withAuth: false
        });
    },
    register: async (body: RegisterRequestType) => {
        const request = RegisterRequest.create({});
        request.type = BoolValue.create({ value: false });
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.Password) request.password = StringValue.create({ value: body.Password });
        if (body.FirstName) request.firstName = StringValue.create({ value: body.FirstName });
        if (body.LastName) request.lastName = StringValue.create({ value: body.LastName });
        if (body.Email) request.email = StringValue.create({ value: body.Email });
        if (body.SendOTPMethod) request.sendOTPMethod = StringValue.create({ value: body.SendOTPMethod });
        if (body.MailLanguage) request.mailLanguage = StringValue.create({ value: body.MailLanguage });

        return executeApiQuery({
            clientMethod: AccountCommandClient.register.bind(AccountCommandClient),
            request,
            defaultValue: null,
            withAuth: false
        });
    },
    reSendOtp: async (body: ResendOtpRequestType) => {
        const request = ReSendOTPRequest.create({});
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.Email) request.email = StringValue.create({ value: body.Email });
        if (body.Case) request.case = StringValue.create({ value: body.Case });
        if (body.Method) request.method = StringValue.create({ value: body.Method });
        if (body.MailLanguage) request.mailLanguage = StringValue.create({ value: body.MailLanguage });

        return executeApiQuery({
            clientMethod: AccountCommandClient.reSendOTP.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    },
    logout: async () => {
        const request = LogoutRequest.create();
        return executeApiQuery({
            clientMethod: AccountCommandClient.logout.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    },
    activateAccount: async (body: ActivateAccountRequestType) => {
        const request = ActivateAccountRequest.create({});
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.OTP) request.oTP = StringValue.create({ value: body.OTP });

        return executeApiQuery({
            clientMethod: AccountCommandClient.activateAccount.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    },
    verifyOTP: async (body: { Tel?: string; OTP?: string }) => {
        const request = VerifyOTPRequest.create({});
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.OTP) request.oTP = StringValue.create({ value: body.OTP });

        return executeApiQuery({
            clientMethod: AccountCommandClient.verifyOTP.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    },
    resetPassword: async (body: { Tel?: string; OTP?: string; Method?: string; MailLanguage?: string }) => {
        const request = ResetPasswordRequest.create({});
        if (body.Tel) request.tel = StringValue.create({ value: body.Tel });
        if (body.OTP) request.oTP = StringValue.create({ value: body.OTP });
        if (body.Method) request.method = StringValue.create({ value: body.Method });
        if (body.MailLanguage) request.mailLanguage = StringValue.create({ value: body.MailLanguage });

        return executeApiQuery({
            clientMethod: AccountCommandClient.resetPassword.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    },
    refreshToken: async (body: { refreshToken?: string }) => {
        const request = RefreshTokenRequest.create({
            refreshToken: createStringValue(body?.refreshToken)
        });
        return executeApiQuery({
            clientMethod: AccountCommandClient.refreshToken.bind(AccountCommandClient),
            request,
            defaultValue: null
        });
    }
};
