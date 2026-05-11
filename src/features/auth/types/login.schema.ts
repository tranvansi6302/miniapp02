import { z } from 'zod'

export const loginSchema = z.object({
  phone: z.string().regex(/^(\+84|84|0)?[1-9]\d{8}$/, 'hb-wv-login-v-phone-inv'),
  password: z.string().min(6, 'hb-wv-login-v-pass-min')
})

export type LoginFormValues = z.infer<typeof loginSchema>
