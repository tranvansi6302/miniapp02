export interface AuthResponseType {
    Id: number
    FirstName: string
    LastName: string
    Gender: number
    DateOfBirth: number
    Img: string
    Tel: string
    AccessToken: string
    RefreshToken: string
}

export type ProfileResponseType = AuthResponseType
