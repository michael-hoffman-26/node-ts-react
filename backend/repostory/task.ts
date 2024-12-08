import { TaskNotExists } from "../errors/TakNotExists";
import { TaskData } from "../models/task";

export interface TaskRepository {
    createTask(data: TaskData): Promise<TaskData>;
    deleteTask(id: number): Promise<void>;
    getAllTasks(): Promise<TaskData[]>;
}

export class InMemoryTaskRepository implements TaskRepository {
    // TODO use MAP
    private tasks: TaskData[] = [];
    private nextId: number = 1;

    async createTask(data: TaskData): Promise<TaskData> {
        const newTask: TaskData = { id: this.nextId++, name: data.name };
        this.tasks.push(newTask);
        
        return newTask;
    }

    async getAllTasks(): Promise<TaskData[]> {
        //todo check this, maybe refactor
        return this.tasks
    }

    async deleteTask(id: number): Promise<void> {
        const beforeLentgh = this.tasks.length
        this.tasks = this.tasks.filter(item => item.id !== id);
        

        if (beforeLentgh === this.tasks.length) {
            throw new TaskNotExists(id)
        }
    }
}



