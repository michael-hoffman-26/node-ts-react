import React, { useState, useEffect } from 'react';
import { addTask, deleteTask, fetchTasks } from '../api/tasks';
import { Task } from '../types/task';



const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTask, setNewTask] = useState<string>('');

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const newTaskData = await addTask(newTask);
                setTasks([...tasks, newTaskData]);
                setNewTask('');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Task List</h1>
            <input
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.name}{' '}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
