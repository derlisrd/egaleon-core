import { z } from "zod";

const loginSchema = z.object({
    identity: z.string({
        error: "El usuario es requerido"
    }).min(1, "El usuario no puede estar vacío"),
    
    password: z.string({
        error: "La contraseña es requerida"
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
});

export default loginSchema
