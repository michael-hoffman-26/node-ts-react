import { ItemNotExists } from "../errors/ItemNotExists";
import { ItemData } from "../models/item";

export interface ItemRepository {
    createItem(data: ItemData): Promise<ItemData>;
    deleteItem(id: number): Promise<void>;
    getAllItems(): Promise<ItemData[]>;
}

export class InMemoryItemRepository implements ItemRepository {
    private items: ItemData[] = [];
    private nextId: number = 1;

    async createItem(data: ItemData): Promise<ItemData> {
        const newItem: ItemData = { id: this.nextId++, name: data.name };
        this.items.push(newItem);
        return newItem;
    }

    async getAllItems(): Promise<ItemData[]> {
        //todo check this, maybe refactor
        return [...this.items]; // Return a copy to prevent external mutation
    }

    async deleteItem(id: number): Promise<void> {
        const beforeLentgh = this.items.length
        this.items = this.items.filter(item => item.id !== id);

        if (beforeLentgh === this.items.length) {
            throw new ItemNotExists(id)
        }
    }
}



