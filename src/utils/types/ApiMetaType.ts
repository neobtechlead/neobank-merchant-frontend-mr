export type ApiMetaType = {
    paged: boolean
    pageNumber: number
    offset: number
    pageSize: number
    unpaged: boolean
    sort: {
        empty: boolean
        unsorted: boolean
        sorted: boolean
    }
}