export type PaginationType = {
    size: number;
    lastPage: boolean;
    firstPage: boolean;
    sorting: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
    };
    totalPages: number;
    totalElements: number;
}