import { Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const updateUser = Router();

updateUser.put(
  '/',
  // Validación de los datos de entrada
  body('username').optional().notEmpty().trim(),
  body('password').optional().isLength({ min: 6 }),

  // Actualizar información del usuario según la sesión del token JWT
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      // Obtener el token JWT del encabezado de la solicitud
      const token = request.headers.authorization.split(' ')[1];

      // Verificar y decodificar el token JWT
      const decodedToken = jwt.verify(token, JWT_SECRET);

      // Obtener el ID del usuario del token decodificado
      const userId = decodedToken.userId;

      // Buscar al usuario en la base de datos utilizando el ID
      const user = await UserModel.findById(userId);

      if (!user) {
        return response.status(404).json({
          error: 'Usuario no encontrado',
        });
      }

      // Actualizar la información del usuario con los datos de la solicitud
      if (request.body.username) {
        user.username = request.body.username;
        user.password = request.body.password;
      }


      // Guardar los cambios en la base de datos
      await user.save();

      // Devolver la información actualizada del usuario
      return response.status(200).json({
        username: user.username,
        password: user.password,
        updatedAt: user.updatedAt,
      });
      // Agrega más propiedades del usuario que deseas devolver en la respuesta
    } catch (error) {
      console.error(`[updateUser]: ${error}`);

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
