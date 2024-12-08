import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

import { TaskService } from '../service/task';
import { createTaskRepo } from '../repostory/task/repostory-factory';

const taskClient = createTaskRepo();
const taskService = new TaskService(taskClient);


export async function createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newTask = await taskService.createItem(req.body);
        res.status(StatusCodes.CREATED).json(newTask);
    } catch (error) {
        next(error)
    }
}

export async function getItems(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tasks = await taskService.getAllItems();
        res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        next(error)
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await taskService.delete(+req.params?.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error)
    }
}