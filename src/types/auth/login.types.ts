export interface LoginResult {
    id: string;
    name: string;
    email: string;
    status: string;
    username: string;
    document_type: string;
    document_number: string;
    token: string;
}


export interface AuthResponse<T = any> {
    status: number;
    error: string | null;
    results: T | null;
}