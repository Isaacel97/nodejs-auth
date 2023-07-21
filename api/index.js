import 'dotenv/config';
import { app } from './app.js';
import { connect as db } from './database.js';

db();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto ${PORT}`)
);
//Este evento se dispara cuando una promesa es rechazada y no se maneja
process.on('unhandledRejection', (err) => {
  console.error(`[server] Ocurrio un error: ${err.message}`);
  server.close(() => process.exit(1));
});
