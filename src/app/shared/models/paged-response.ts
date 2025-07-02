export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PagedResponse<T> {
    content: T[];
    page: PageInfo;
}
