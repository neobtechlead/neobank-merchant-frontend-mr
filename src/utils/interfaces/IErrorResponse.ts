interface Violation {
    field: string;
    message: string;
}

export interface ErrorResponse {
    message: string;
    httpStatusCode: number;
    data: {
        violations: Violation[] | null;
    };
}