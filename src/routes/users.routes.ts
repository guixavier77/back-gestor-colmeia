import { Router } from 'express';
import CreateUserController from '../controllers/users/createUsers.controller';
import { adapt } from './adapter/express-adapter';
import { Controller } from '../controllers/protocols/controller.protocols';
import { UserRepository } from '../repositories/userRepository';
import CreateUserService from '../services/users/createUser.service';
import AuthUserController from '../controllers/users/authUser.controller';
import AuthUserService from '../services/users/authUser.service';
import { AuthRepository } from '../repositories/authRepository';
import auth from '../middlewares/auth';
import RefreshTokenUserService from '../services/users/refreshTokenUser.service';
import RefreshTokenUserController from '../controllers/users/refreshTokenUser.controller';
import GetAllUsersService from '../services/users/getAllUsers.service';
import GetAllUsersController from '../controllers/users/getAllApiarist.controller';
import UpdateUserController from '../controllers/users/updateUser.controller';
import UpdateUserService from '../services/users/updateUser.service';

const usersRouter = Router();


const makeCreateUserController = (): Controller => {  
  const userRepository = new UserRepository();
  const createUserService = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};

const makeUpdateUserController = (): Controller => {  
  const userRepository = new UserRepository();
  const updateUserService = new UpdateUserService(userRepository);
  const updateUserController = new UpdateUserController(updateUserService);

  return updateUserController;
};


const makeAuthUserController = (): Controller => {  
  const authRepository = new AuthRepository();
  const authUserService = new AuthUserService(authRepository);
  const authUserController = new AuthUserController(authUserService);

  return authUserController;
};

const makeRefreshTokenUserController = (): Controller => {
  const refreshTokenService = new RefreshTokenUserService();
  const refreshTokenController = new RefreshTokenUserController(refreshTokenService);

  return refreshTokenController;
}


const makeListUserController = (): Controller => {  
  const userRepository = new UserRepository();
  const getAllUsersService = new GetAllUsersService(userRepository);
  const getAllUsersController = new GetAllUsersController(getAllUsersService);

  return getAllUsersController;
};


usersRouter
  .put('/users/update/:id', auth, adapt(makeUpdateUserController()))
  .post('/users/create', auth, adapt(makeCreateUserController()))
  .post('/users/auth', adapt(makeAuthUserController()))
  .get('/users/refreshToken', adapt(makeRefreshTokenUserController()))
  .get('/users/list', auth, adapt(makeListUserController()))
// usersRouter.post('/authUsers', usersController.auth);
// usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
// usersRouter.put('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.update);
// usersRouter.post('/refreshToken', usersController.refreshToken);


// usersRouter.post('/users/sendEmailResetPassword/:email', usersController.sendEmailResetPassword);
// usersRouter.post('/users/changePassword/:password', usersController.changePassword);


export default usersRouter