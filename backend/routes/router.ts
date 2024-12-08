import express from 'express';

import taskRouter from './task';
import healthRouter from './health';


const router = express.Router();

router.use("/task", taskRouter);
router.use('/health', healthRouter);

export default router;