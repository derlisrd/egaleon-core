import { Request, Response } from 'express';

import { handleError } from '@/src/utils/error.handler.js';
import authService from '../services/auth.service.js';

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { identity, password } = req.body;
            const result = await authService .login(identity, password);
            
            return res.status(200).json({
                status: 200,
                error: null,
                results: result
            });
        } catch (error) {
            return handleError(error, res);
        }
    }
    async register(req: Request, res: Response) {
        try {
            const result = await authService . register(req.body);
            return res.status(200).json({
                status: 200,
                error: null,
                results: result
            });
        } catch (error) {
            return handleError(error, res);
        }
    }
}

export default new AuthController();