import { z } from 'zod'

export const registerSchema = z.object({
  lastName: z.string().min(1, 'hb-wv-reg-v-lname-req'),
  firstName: z.string().min(1, 'hb-wv-reg-v-fname-req'),
  email: z.string().email('hb-wv-reg-v-email-inv'),
  phone: z.string().regex(/^(\+84|84|0)?[1-9]\d{8}$/, 'hb-wv-reg-v-phone-inv'),
  password: z.string().min(6, 'hb-wv-reg-v-pass-min'),
  confirmPassword: z.string().min(6, 'hb-wv-reg-v-pass-min'),
  agreement: z.boolean().refine(val => val === true, 'hb-wv-reg-v-agree-req'),
  otpMethod: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "hb-wv-reg-v-pass-mismatch",
  path: ["confirmPassword"],
})

export type RegisterFormValues = z.infer<typeof registerSchema>
