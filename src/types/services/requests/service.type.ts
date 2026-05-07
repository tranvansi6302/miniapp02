// Login request type
export type GetAllBookingCatalogServicesRequestType = {
    pagingOption?: {
        pageNumber?: number

        pageSize?: number
    }

    serName?: string

    orderByOption?: {
        field: string

        isDescending: boolean
    }[]

    filter?: {
        field: string
        operator: string
        values: string[]
    }[]

    servPid?: number

    isOnlyChildren?: boolean
}

export type GetDetailBookingCatalogServiceRequestType = {
    id: number
}
