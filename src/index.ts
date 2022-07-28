import express from 'express';
import bearerAuthentication from './middlewares/bearer-authentication.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const server = express();

// Configurações da aplicação
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configurações de rotas
server.use(statusRoute);
server.use(bearerAuthentication, usersRoute);
server.use(authorizationRoute);

// Configuração dos Hnadlers de Erro
server.use(errorHandler);

// Configuração do servidor
server.listen(3000, () => {
  console.log('Servidor subiu...');
});
