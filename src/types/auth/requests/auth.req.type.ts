// Login request type
export type LoginRequestType = {
    Tel: string
    Password: string
}

// Logout request type
export type LogoutRequestType = {
    Id: number
}

export type RefreshTokenRequestType = {
    RefreshToken: string
}

export type RegisterRequestType = {
    Tel?: string
    Password?: string
    Type?: boolean
    FirstName?: string
    LastName?: string
    Email?: string
    SendOTPMethod?: string
    MailLanguage?: string
}

export type ActivateAccountRequestType = {
    Tel?: string
    OTP?: string
}
export type ResendOtpRequestType = {
    Tel?: string
    Email?: string
    Case?: string
    Method?: string
    MailLanguage?: string
}
