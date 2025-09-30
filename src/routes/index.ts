import { Router } from "express";
import usersroute from './api/users.js'

const api  = Router()

api.use('/api/users',usersroute)


export default api