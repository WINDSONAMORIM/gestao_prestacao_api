export interface ResponseAPI<T = any> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}