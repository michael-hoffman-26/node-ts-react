import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class TaskNotExists extends BaseError {
    constructor(id: number) {
        super(`Task with id: ${id} doesn't exists`, StatusCodes.NOT_FOUND, `Task with id: ${id} doesn't exists`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TaskNotExists.prototype);
    }
}