import { body, ValidationChain, param } from 'express-validator';

export const postItemValidator: ValidationChain[] = [
    body('name').exists().trim().isString().notEmpty(),
];


export const deleteItemValidator: ValidationChain[] = [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt().withMessage('ID must be a number') 
        .notEmpty().withMessage('ID cannot be empty')
];
