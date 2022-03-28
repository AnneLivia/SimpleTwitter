import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();

const userController = new UserController();

router.get('/users', userController.index);
router.get('/users/:id', userController.getOne);
router.post('/users', userController.store);
router.post('/login', userController.login);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

export default router;
