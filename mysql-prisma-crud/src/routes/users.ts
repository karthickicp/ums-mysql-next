import express, { Router } from "express";
// import * as userController from '@/controller/users';
import * as userController from '../controller/users';

const router: Router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getUnique);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export const usersRouter: Router = router;