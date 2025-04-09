import { Router } from 'express'
import usersRouter from './users.routes';
import apiaristRouter from './apiarist.routes';

const router = Router()

router.get('/healthCheck', (__, res) => {
	res.status(200).send({
		message: 'OK',
		uptime: process.uptime()
	});
});

router.use(usersRouter);
router.use(apiaristRouter)


export default router

