import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import ForbiddenError from '../models/errors/forbidden.error';
import jwtAuthentication from '../middlewares/jwt-authentication.middleware';
import basicAuthentication from '../middlewares/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post(
  '/token',
  basicAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ForbiddenError('Usuário não informado.');
      }
      const jwtPayload = { username: user.username };
      const jwtOptions = { subject: user?.uuid };
      const secretKey = 'my_secret_key';
      const resultJWT = jwt.sign(jwtPayload, secretKey, jwtOptions);
      res.status(StatusCodes.OK).json({ token: resultJWT });
    } catch (error) {
      next(error);
    }
  }
);

authorizationRoute.post(
  '/token/validate',
  jwtAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);
export default authorizationRoute;
