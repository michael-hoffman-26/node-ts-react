import express from 'express'

import { validateRequest } from '../../validator/validator';
import { deleteItemValidator, postItemValidator, } from './validators';
import { createItem, deleteItem, getItems } from '../../controller/items';

const router = express.Router();

router.post('',
    postItemValidator,
    validateRequest,
    createItem
);

router.get('',
    getItems
);

router.delete('/:id',
    deleteItemValidator,
    validateRequest,
    deleteItem
);

export default router;
