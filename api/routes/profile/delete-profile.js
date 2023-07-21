import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const deleteUser = Router();

deleteUser.delete(
  '/',
  async (request, response) => {
    try {
      // Obtener el token JWT del encabezado de la solicitud
      const token = request.headers.authorization.split(' ')[1];

      // Verificar y decodificar el token JWT
      const decodedToken = jwt.verify(token, JWT_SECRET);

      // Obtener el ID del usuario del token decodificado
      const userId = decodedToken.userId;

      // Eliminar al usuario de la base de datos utilizando el ID
      await UserModel.findByIdAndDelete(userId);

      return response.status(200).json({
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error) {
      console.error(`[deleteUser]: ${error}`);

      if (error instanceof jwt.JsonWebTokenError) {
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
