import axios from "axios";


export interface ApiFieldError {
    type?: string;
    value?: unknown;
    msg: string;
    path: string;
    location?: string;
}


export interface ApiErrorResponse {
    success?: boolean;
    message?: string;
    errors?: ApiFieldError[];
}


export interface ParsedApiError {
    message: string;
    fieldErrors: Record<string, string>;
    status?: number;
}


export const getApiError = (error: unknown): ParsedApiError => {

    if (axios.isAxiosError<ApiErrorResponse>(error)) {

        const data = error.response?.data;

        const fieldErrors: Record<string, string> = {};

        data?.errors?.forEach(err => {
            fieldErrors[err.path] = err.msg;
        })
        return {
            message:
                data?.message ||
                "Something went wrong. Please try again.",

            fieldErrors,

            status: error.response?.status,
        };
    }

    return {
        message: "Something went wrong. Please try again.",
        fieldErrors: {},
    };
}