import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class ItemNotExists extends BaseError {
    constructor(id: number) {
        super(`Item with id: ${id} donst exsits`, StatusCodes.NOT_FOUND, `Item with id: ${id} donst exsits`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ItemNotExists.prototype);
    }
}