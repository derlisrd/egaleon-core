import { Router } from "express";
import authRoute from './api/auth.js'

const api  = Router()

api.use('/api/auth',authRoute)


export default api