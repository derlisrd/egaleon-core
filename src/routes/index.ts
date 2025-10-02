import { Router } from "express";
import authRoute from './api/auth.route.js'

const api  = Router()

api.use('/api/auth',authRoute)


export default api