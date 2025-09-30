import pb from "../config/pocketbase.js";


class UsersController{
    static async index(){

        const results = await pb.collection('users').authWithPassword('derlisruizdiaz@hotmail.com', 'decanodecano10');

        return {
            success: true,
            message: 'ready',
            results
        }
    }
}

export default UsersController