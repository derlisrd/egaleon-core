import winston from 'winston'
import path from 'path'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// --- Configuración de la ruta ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construye la ruta absoluta al archivo deseado: src/storage/logs/app.log
// Nota: Ajusta la cantidad de '..' según dónde se encuentre este archivo de logger.
// Asumo que este archivo está dentro de 'src/' o un subdirectorio.
const logFilePath = path.join(__dirname, '..', 'storage', 'logs', 'app.log');

// --- Configuración del Logger ---
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [


    // 2. Logs de Info y superiores (El transport deseado)
    new winston.transports.File({ 
        filename: logFilePath, 
        level: 'info'          
    }),

    // Opcional: Transport para la consola (útil durante el desarrollo)
    new winston.transports.Console({
        format: winston.format.simple(),
    }),
  ],
});

export default logger;