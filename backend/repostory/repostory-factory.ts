import { InMemoryItemRepository, ItemRepository } from './item';
import { CURRENT_REPO } from '../utils/consts';

export function createRepository(): ItemRepository {   
    switch (CURRENT_REPO) {
        case 'in-memory-cache': // Matches exactly with DEFAULT_REPO in consts.ts
            return new InMemoryItemRepository();

        // Future repository types can be added here as additional cases

        default:
            throw new Error(`Unknown repository type: ${CURRENT_REPO }`);
    }
}
