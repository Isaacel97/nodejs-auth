import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const viewUser = Router();

viewUser.get(
  '/',
  // @todo: Validación  de los datos de entrada

  // @todo: Ver información del usuario actual según la sesión del token JWT
  async (request, response) => {
    try {
      // Obtener el token JWT del encabezado de la solicitud
      const token = request.headers.authorization.split(' ')[1];

      // Verificar y decodificar el token JWT
      const decodedToken = jwt.verify(token, JWT_SECRET); // Reemplaza esto con tu propia clave secreta

      // Obtener el ID del usuario del token decodificado
      const userId = decodedToken.userId;

      // Buscar al usuario en la base de datos utilizando el ID
      const user = await UserModel.findById(userId);

      if (!user) {
        return response.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      // Devolver la información del usuario
      return response.status(200).json({
        username: user.username,
        // Agrega más propiedades del usuario que deseas devolver en la respuesta
      });
    } catch (error) {
      console.error(`[viewUser]: ${error}`);

      if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'Token JWT inválido',
        });
      }

      return response.status(500).json({
        error: 'Ocurrió un error inesperado. Por favor, inténtelo más tarde',
      });
    }
  }
);
