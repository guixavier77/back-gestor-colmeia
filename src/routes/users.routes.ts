import { Router } from 'express';
import CreateUserController from '../controllers/users/createUsers.controller';
import { adapt } from './adapter/express-adapter';
import { Controller } from '../controllers/protocols/controller.protocols';
import { UserRepository } from '../repositories/userRepository';
import CreateUserService from '../services/users/createUser.service';

const usersRouter = Router();


const makeCreateUserController = (): Controller => {  

  const userRepository = new UserRepository();

  const createUserService = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};


usersRouter
  .post('/users', adapt(makeCreateUserController()));
// usersRouter.post('/authUsers', usersController.auth);
// usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
// usersRouter.put('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.update);
// usersRouter.post('/refreshToken', usersController.refreshToken);


// usersRouter.post('/users/sendEmailResetPassword/:email', usersController.sendEmailResetPassword);
// usersRouter.post('/users/changePassword/:password', usersController.changePassword);


export default usersRouter