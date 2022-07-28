import { NextFunction, Request, Response } from 'express';
import ForbiddenError from '../models/errors/forbidden.error';
import jwt from 'jsonwebtoken';

async function bearerAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw new ForbiddenError('Credenciais não informadas.');
    }
    const [typeAuthentication, token] = authorizationHeader.split(' ');
    if (typeAuthentication !== 'Bearer' || !token) {
      throw new ForbiddenError('Tipo de autenticação inválido.');
    }
    const tokenPayload = jwt.verify(token, 'my_secret_key');
    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido.');
    }

    const user = {
      uuid: tokenPayload.sub,
      username: tokenPayload.username,
    };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
export default bearerAuthentication;
