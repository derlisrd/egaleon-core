import pb from "../config/pocketbase.js";
import { ClientResponseError } from 'pocketbase';


class AuthController{
    static async login(identity: string, password: string){
        try {
            const { token, record } = await pb.collection('users').authWithPassword(identity,password);
            return {
                status: 200,
                error: null,
                results: {
                    id: record.id,
                    name: record.name,
                    email: record.email,
                    status: record.status,
                    username: record.username,
                    document_type: record.document_type,
                    document_number: record.document_number,
                    token
                }
            }
        } catch (error) {
            console.log(error)
            if (error instanceof ClientResponseError) {
                return {
                    status: error.status,
                    error: error.message,
                    results: null
                }
            }

            return {
                status: 500,
                error: 'Error interno de servidor.',
                results: null
            }
        }
    }
}

export default AuthController