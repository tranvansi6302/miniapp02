import { z } from 'zod'

export const loginSchema = z.object({
  phone: z.string().min(10, 'hb-w-form-partner-validate-phone').max(12, 'hb-w-form-partner-validate-phone'),
  password: z.string().min(6, 'hb-w-form-partner-validate-required')
})

export type LoginFormValues = z.infer<typeof loginSchema>
