import { Router } from 'express';
import { Controller } from '../controllers/protocols/controller.protocols';
import CreateUserController from '../controllers/users/createUsers.controller';
import auth from '../middlewares/auth';
import { UserRepository } from '../repositories/userRepository';
import CreateUserService from '../services/users/createUser.service';
import { adapt } from './adapter/express-adapter';
import { ApiaristRepository } from '../repositories/apiaristRepository';
import CreateApiaristService from '../services/apiarist/createApiarist.service';
import CreateApiaristController from '../controllers/apiarist/createApiarist.controller';
import GetAllApiaristService from '../services/apiarist/getAllApiarist.service';
import GetAllApiaristController from '../controllers/apiarist/getAllApiarist.controller';
import UpdateApiaristService from '../services/apiarist/updateApiarist.service';
import UpdateApiaristController from '../controllers/apiarist/updateApiarist.controller';
import RefreshTokenUserService from '../services/users/refreshTokenUser.service';
import RefreshTokenUserController from '../controllers/users/refreshTokenUser.controller';
import { AuthRepository } from '../repositories/authRepository';
import AuthApiaristService from '../services/apiarist/authApiarist.service';
import AuthApiaristController from '../controllers/apiarist/authApiarist.controller';

const apiaristRouter = Router();


const makeCreateApiaristController = (): Controller => {  
  const apiaristRepository = new ApiaristRepository();
  const apiaristService = new CreateApiaristService(apiaristRepository);
  const createApiaristController = new CreateApiaristController(apiaristService);

  return createApiaristController;
};

const makeUpdateApiaristController = (): Controller => {  
  const apiaristRepository = new ApiaristRepository();
  const apiaristService = new UpdateApiaristService(apiaristRepository);
  const apiaristController = new UpdateApiaristController(apiaristService);

  return apiaristController;
};


const makeGetAllApiaristController = (): Controller => {  
  const apiaristRepository = new ApiaristRepository();
  const apiaristService = new GetAllApiaristService(apiaristRepository);
  const apiaristController = new GetAllApiaristController(apiaristService);

  return apiaristController;
};

const makeRefreshTokenUserController = (): Controller => {
  const refreshTokenService = new RefreshTokenUserService();
  const refreshTokenController = new RefreshTokenUserController(refreshTokenService);

  return refreshTokenController;
}


const makeAuthApiaristController = (): Controller => {  
  const authRepository = new AuthRepository();
  const authApiaristrService = new AuthApiaristService(authRepository);
  const authApiaristrController = new AuthApiaristController(authApiaristrService);

  return authApiaristrController;
};





apiaristRouter
  .post('/apiarist/create', auth, adapt(makeCreateApiaristController()))
  .get('/apiarist/list', auth, adapt(makeGetAllApiaristController()))
  .put('/apiarist/update/:id', auth, adapt(makeUpdateApiaristController()))
  .get('/apiarist/refreshToken', adapt(makeRefreshTokenUserController()))
  .post('/apiarist/auth', adapt(makeAuthApiaristController()))

// usersRouter.post('/authUsers', usersController.auth);
// usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
// usersRouter.put('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.update);
// usersRouter.post('/refreshToken', usersController.refreshToken);


// usersRouter.post('/users/sendEmailResetPassword/:email', usersController.sendEmailResetPassword);
// usersRouter.post('/users/changePassword/:password', usersController.changePassword);


export default apiaristRouter