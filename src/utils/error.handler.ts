import { Response } from 'express';
import { ClientResponseError } from 'pocketbase';
import logger from './logger.js';

export function handleError(error: unknown, res: Response) {
    if (error instanceof ClientResponseError) {
        return res.status(error.status).json({
            status: error.status,
            error: error.message,
            results: null
        });
    }

    logger.error(error);
    
    return res.status(500).json({
        status: 500,
        error: 'Error interno de servidor.',
        results: null
    });
}