import { InMemoryItemRepository, ItemRepository } from './item';
import { CURRENT_REPO } from '../utils/consts';

/**
 * I have choosed to implement a simple In memory cache
 * So it would be easier and fast to create this project
 */
export function createRepository(): ItemRepository {
    switch (CURRENT_REPO) {
        case 'in-memory-cache':
            return new InMemoryItemRepository();
        // Future repository types can be added here as additional cases

        default:
            throw new Error(`Unknown repository type: ${CURRENT_REPO }`);
    }
}
