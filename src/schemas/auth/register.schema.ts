import { z } from 'zod';

export const registerSchema = z.object({
    email: z.email('Ingrese un email valido'),
    name: z.string().min(3, 'Ingrese el nombre'),
    phone: z.string().min(3, 'Ingrese el nombre'),
    lastname: z.string().min(3, 'Ingrese el apellido'),
    document_number: z.string('Ingrese el numero de documento'),
    document_type: z.enum(['ci','ruc','otro']),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    passwordConfirm: z.string().min(6, "La confirmación de contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden", // Mensaje de error si la validación falla
    path: ["password_confirm"], // Opcional: Especifica qué campo debe mostrar el error
  });