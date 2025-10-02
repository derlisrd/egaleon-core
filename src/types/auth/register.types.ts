export interface RegisterParams {
    name: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirm:string;
    document_type: string;
    document_number: string;
    phone: string;
    
}


export interface AuthResponse<T = any> {
    status: number;
    error: string | null;
    results: T | null;
}