import { Router } from "express";
import { validate } from "@/src/middleware/validate.middleware.js";
import { loginSchema } from "@/src/schemas/auth/login.schema.js";
import { registerSchema } from "@/src/schemas/auth/register.schema.js";
import authController from "@/src/controllers/auth.controller.js";

const router = Router();

router.post("/login",validate(loginSchema),authController.login);
router.post("/register",validate(registerSchema),authController.register);

export default router;