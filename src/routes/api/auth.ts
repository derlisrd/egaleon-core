import { Request, Response, Router} from "express";
import AuthController from "@/src/controllers/auth.controller.js";
import { ZodError } from "zod";
import loginSchema from "@/src/schemas/auth/login.schema.js";


const router = Router();


router.post('/login',async (req: Request, res: Response)=>{
    try {
        const { identity, password } = loginSchema.parse(req.body);
        const response = await AuthController.login(identity, password)
        return res.status(response.status).json(response)

    } catch (e) {
        console.log(e)
        if (e instanceof ZodError) {
            return res.status(400).json({
                status: 400,
                error: JSON.parse(e.message),
                results: null
            })
        }
        return res.status(500).json({
            status:500,
            error: 'Error de servidor. LPA500',
            results:null
        })
    }
})


export default router;