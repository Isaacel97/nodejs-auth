import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = Router();

login.post(
  '/',
  // Validación de los datos de entrada
  body('username').not().isEmpty().trim(),
  body('password').isLength({ min: 6 }),

  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { username, password } = request.body;
      
      const user = await UserModel.findOne({ username });

      if (!user) {
        return response.status(400).json({
          error: 'Usuario incorrecto',
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return response.status(400).json({
          error: 'Contraseña incorrecta',
        });
      }
     
      // Encripta la nueva contraseña si se proporciona en la solicitud
      if (request.body.newPassword) {
        const hashedPassword = await bcrypt.hash(request.body.newPassword, 10);
        user.password = hashedPassword;
      }

      // Guarda los cambios en la base de datos
      await user.save();

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' } // tiempo de expiración del token
      );

      return response.status(201).json({ token, username: user.username});
    } catch (error) {
      console.error(`[signIn]: ${error}`);

      return response.status(500).json({
        error: 'Ocurrió un error inesperado. Por favor, inténtelo más tarde',
      });
    }
  }
);
