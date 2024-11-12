import { ItemData } from '../models/item';
import { ItemRepository } from '../repostory/item';

export class ItemService {
    private repositoryClient: ItemRepository;

    constructor(repositoryClient: ItemRepository) {
        this.repositoryClient = repositoryClient;
    }

    async createItem(data: ItemData): Promise<ItemData> {
        return this.repositoryClient.createItem(data);
    }

    async getAllItems(): Promise<ItemData[]> {
        return this.repositoryClient.getAllItems();
    }

    async delete(id: number): Promise<void> {
        return this.repositoryClient.deleteItem(id);
    }
}


