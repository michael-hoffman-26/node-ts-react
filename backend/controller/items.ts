import {NextFunction, Request, Response} from "express";
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { ItemService } from '../service/item';
import { createRepository } from '../repostory/repostory-factory';

const repositoryClient = createRepository();
const itemService = new ItemService(repositoryClient);


export async function createItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(StatusCodes.CREATED).json(newItem);
    } catch (error) {
        next(error)
    }
}

export async function getItems(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const items = await itemService.getAllItems();
        res.status(StatusCodes.OK).json(items);
    } catch (error) {
        next(error)
    }
}

export async function deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const items = await itemService.delete(+req.params?.id);
        res.status(StatusCodes.NO_CONTENT).json(items);
    } catch (error) {
        next(error)
    }
}