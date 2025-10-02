// authService.js (o un archivo de inicialización)
import pb from "../config/pocketbase.js";
import logger from "../utils/logger.js";
// ...

// Antes de llamar a register o al inicio del servicio, autentica como Admin
export async function initializePocketbaseAdmin() {
  try {
    await pb.collection("_superusers").authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL || '', process.env.POCKETBASE_ADMIN_PASSWORD || '');
    console.log("PocketBase autenticado como Admin.");
  } catch (error) {
    logger.error("Error al autenticar PocketBase como Admin:", error);
    // Manejar error, salir o reintentar
  }
}
