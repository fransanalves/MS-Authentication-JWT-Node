import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden.error';
import userRepository from '../repositories/user.repository';

async function basicAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new ForbiddenError('Erro na Autenticação.');
    }
    const [typeAuthentication, token] = authorizationHeader.split(' ');
    if (typeAuthentication !== 'Basic' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido.');
    }
    const contentToken = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = contentToken.split(':');
    if (!username || !password) {
      throw new ForbiddenError('Credenciais não preenchidas.');
    }
    const user = await userRepository.findByUsernameAndPassword(
      username,
      password
    );
    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos.');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
export default basicAuthentication;
