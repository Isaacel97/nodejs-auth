#  Backend

Esta carpeta corresponde al Backend de este proyecto.

##  Dependencias

1. Node.js

1. MongoDB

  Si no queires realizar la instalación de mongo, Puedes incluir la conexión a la base de datos de tu cuenta de Mongo Atlas. 
## 🤖 Guía Rápida Para Desarrollo Local

1. Instala dependencias


1. Configura tus variables de entorno

   ```sh
   cp api/.env.example api/.env
   ```
   
   Conecta en tu archivo .env la URL de la conexión a tu BD de Mongo Atlas. 

1. Inicia la aplicación backend

   ```sh
   # Desde la raíz del proyecto:
   npm start --workspace=api
   ```

   La app estará disponible y escuchando peticiones HTTP en http://localhost:3000

1. Para instalar nuevas dependencias en este paquete

   ```sh
   # Desde la raíz del proyecto:
   npm install nombrelibreria --workspace=api
   ```

   Más información en https://docs.npmjs.com/cli/v7/using-npm/workspaces
