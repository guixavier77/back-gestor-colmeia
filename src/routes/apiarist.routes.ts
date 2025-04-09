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

const apiaristRouter = Router();


const makeCreateApiaristController = (): Controller => {  
  const apiaristRepository = new ApiaristRepository();
  const apiaristService = new CreateApiaristService(apiaristRepository);
  const createApiaristController = new CreateApiaristController(apiaristService);

  return createApiaristController;
};

const makeGetAllApiaristController = (): Controller => {  
  const apiaristRepository = new ApiaristRepository();
  const apiaristService = new GetAllApiaristService(apiaristRepository);
  const apiaristController = new GetAllApiaristController(apiaristService);

  return apiaristController;
};






apiaristRouter
  .post('/apiarist/create', auth, adapt(makeCreateApiaristController()))
  .get('/apiarist/list', auth, adapt(makeGetAllApiaristController()))

// usersRouter.post('/authUsers', usersController.auth);
// usersRouter.get('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.getAll);
// usersRouter.put('/users', validateAuth([ROLE.ADMIN, ROLE.SUPERADMIN]), usersController.update);
// usersRouter.post('/refreshToken', usersController.refreshToken);


// usersRouter.post('/users/sendEmailResetPassword/:email', usersController.sendEmailResetPassword);
// usersRouter.post('/users/changePassword/:password', usersController.changePassword);


export default apiaristRouter