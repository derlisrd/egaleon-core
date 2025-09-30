import { Request, Response, Router} from "express";
import UsersController from "@/src/controllers/users.controller.js";


const router = Router();


router.get('/',async (req: Request, res: Response)=>{
    const response = await UsersController.index()
    res.json(response)
})


export default router;