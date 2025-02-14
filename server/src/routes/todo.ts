import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/todo';

const router = express.Router();

router.route('/').post(createTodo);
router.route('/').get(getTodos);
router.route('/:todoId').put(updateTodo);
router.route('/:todoId').delete(deleteTodo);

export default router;