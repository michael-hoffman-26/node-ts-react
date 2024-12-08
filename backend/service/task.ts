import { TaskData } from '../models/task';
import { TaskRepository } from '../repostory/task/task';

export class TaskService {
    private repositoryClient: TaskRepository;

    constructor(repositoryClient: TaskRepository) {
        this.repositoryClient = repositoryClient;
    }

    async createItem(data: TaskData): Promise<TaskData> {
        return this.repositoryClient.createTask(data);
    }

    async getAllItems(): Promise<TaskData[]> {
        return this.repositoryClient.getAllTasks();
    }

    async delete(id: number): Promise<void> {
        return this.repositoryClient.deleteTask(id);
    }
}


