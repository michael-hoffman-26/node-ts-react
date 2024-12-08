import express from 'express'

import { validateRequest } from '../../validator/validator';
import { deleteTaskValidator, postTaskValidator, } from './validators';
import { createTask, deleteItem, getItems } from '../../controller/items';

const router = express.Router();

router.post('',
    postTaskValidator,
    validateRequest,
    createTask
);

router.get('',
    getItems
);

router.delete('/:id',
    deleteTaskValidator,
    validateRequest,
    deleteItem
);

export default router;
