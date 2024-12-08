import { body, ValidationChain, param } from 'express-validator';

export const postTaskValidator: ValidationChain[] = [
    body('name').exists().trim().isString().notEmpty(),
];


export const deleteTaskValidator: ValidationChain[] = [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number')
        .notEmpty().withMessage('ID cannot be empty')
];
