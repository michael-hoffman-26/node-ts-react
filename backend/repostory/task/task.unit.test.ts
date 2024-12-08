import { InMemoryTaskRepository } from "./task";
import { TaskData } from "../../models/task";
import { TaskNotExists } from "../../errors/TakNotExists";

describe("InMemoryTaskRepository", () => {
    let taskRepo: InMemoryTaskRepository;

    beforeEach(() => {
        taskRepo = new InMemoryTaskRepository();
    });

    it("should create a new task with a unique ID", async () => {
        const task: TaskData = { name: "Test Task" };
        const createdTask = await taskRepo.createTask(task);

        expect(createdTask).toHaveProperty("id");
        expect(createdTask.name).toBe(task.name);
        expect(typeof createdTask.id).toBe("number");
    });

    it("should retrieve all tasks", async () => {
        const tasks: TaskData[] = [
            { name: "Task 1" },
            { name: "Task 2" },
        ];
        for (const task of tasks) {
            await taskRepo.createTask(task);
        }

        const allTasks = await taskRepo.getAllTasks();
        expect(allTasks.length).toBe(tasks.length);
        expect(allTasks.map(t => t.name)).toEqual(tasks.map(t => t.name));
    });

    // it.skip("should delete a task when it exists", async () => {
    //     const task = { name: "Task to Delete" };
    //     const createdTask = await taskRepo.createTask(task);

    //     await taskRepo.deleteTask(createdTask.id);
    //     const allTasks = await taskRepo.getAllTasks();

    //     expect(allTasks.some(t => t.id === createdTask.id)).toBe(false);
    // });

    it("should throw TaskNotExists error when deleting a non-existent task", async () => {
        const nonExistentTaskId = 999;

        await expect(taskRepo.deleteTask(nonExistentTaskId)).rejects.toThrow(TaskNotExists);
    });
});
