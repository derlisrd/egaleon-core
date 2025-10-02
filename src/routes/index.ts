import { Router } from "express";
import authRoute from './api/auth.route.js'

const api  = Router()

api.use('/api/auth',authRoute)

api.get('/online',async function(){
    return {
        'success':true
    }
})


export default api