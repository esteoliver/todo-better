import express from 'express';
import tasksRouter from './v1/tasksRoute';

const router = express.Router();

router.use('/v1/tasks', tasksRouter);

export default router;
