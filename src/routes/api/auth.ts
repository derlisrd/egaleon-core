import { Request, Response, Router} from "express";
import AuthController from "@/src/controllers/auth.controller.js";



const router = Router();


router.post('/login',async (req: Request, res: Response)=>{
        const { identity, password } = (req.body);
        const response = await AuthController.login(identity, password)
        return res.status(response.status).json(response)
})


export default router;