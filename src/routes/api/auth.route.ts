import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema } from "../../schemas/auth/login.schema.js";
import { registerSchema } from "../../schemas/auth/register.schema.js";
import authController from "../../controllers/auth.controller.js";

const router = Router();

router.post("/login",validate(loginSchema),authController.login);
router.post("/register",validate(registerSchema),authController.register);

export default router;