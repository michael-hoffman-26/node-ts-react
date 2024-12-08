import { InMemoryTaskRepository, TaskRepository } from './task';
import { CURRENT_TASK_REPO } from '../../utils/consts';

/**
 * I have choosed to implement a simple In memory cache
 * So it would be easier and fast to create this project
 */
export function createTaskRepo(): TaskRepository {
    switch (CURRENT_TASK_REPO) {
        case 'in-memory-cache':
            return new InMemoryTaskRepository();
        // Future repository types can be added here as additional cases

        default:
            throw new Error(`Unknown repository type: ${CURRENT_TASK_REPO}`);
    }
}
