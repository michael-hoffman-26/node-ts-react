import request from 'supertest';
import { createApp } from '../../../app';

describe('E2E Tests', () => {
    let app;
    const tasksPath = '/api/task';

    beforeAll(() => {
        app = createApp();
    });

    it('should create new task successfully', async () => {
        // Arrange
        const newItemData = {
            name: "Brand New Item"
        }

        // Act
        const res = await request(app)
            .post(tasksPath)
            .send({name: newItemData.name})
        
        // Assert
        expect(res.status).toBe(201);
        const { body } = res
        expect(body.name).toBe(newItemData.name);
        expect(body.id).toBeGreaterThan(0)
    });

    it('should be able to delete Created Item', async () => {
        // Arrange
        const newItemData = {
            name: "Brand New Item"
        }

        // Act
        const createRes = await request(app)
            .post(tasksPath)
            .send({ name: newItemData.name })
        const { body } = createRes
        const taskIdToDelete = body.id

        const deleteRes = await request(app)
            .delete(tasksPath + '/'+ taskIdToDelete)

        const getAllTasksRes = await request(app)
            .get(tasksPath)
    

        // Assert
        expect(createRes.status).toBe(201);
        expect(deleteRes.status).toBe(204);
        expect(getAllTasksRes.status).toBe(200);
        expect(getAllTasksRes.body.every(task => task.id !== taskIdToDelete)).toBeTruthy()
    });

    it('should retrieve all created items', async () => {
        // Arrange
        const newItems = [
            { name: "Task One" },
            { name: "Task Two" }
        ];

        // Create multiple tasks
        for (const item of newItems) {
            const createRes = await request(app)
                .post(tasksPath)
                .send({ name: item.name });
            expect(createRes.status).toBe(201);
        }

        // Act
        const getAllTasksRes = await request(app).get(tasksPath);

        // Assert
        expect(getAllTasksRes.status).toBe(200);
        const allTasks = getAllTasksRes.body;

        expect(Array.isArray(allTasks)).toBeTruthy();
        expect(allTasks.length).toBeGreaterThanOrEqual(newItems.length);

        // Ensure each created task is in the response
        newItems.forEach((item) => {
            expect(allTasks.some((task: { name: string }) => task.name === item.name)).toBeTruthy();
        });
    });


    it('should return 404 when trying to delete a non-existent task', async () => {
        // Arrange
        const nonExistentTaskId = -100; // ID that doesn't exist in the database

        // Act
        const deleteRes = await request(app).delete(`${tasksPath}/${nonExistentTaskId}`);

        // Assert
        expect(deleteRes.status).toBe(404);
        expect(deleteRes.body).toHaveProperty('error');
        expect(deleteRes.body.error).toBe(`Task with id: ${nonExistentTaskId} doesn't exists`);
    });


});
