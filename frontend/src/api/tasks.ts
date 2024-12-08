const TASK_API = '/api/task'

export const fetchTasks = async () => {
    const response = await fetch(TASK_API);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
};

export const deleteTask = async (id: number) => {
    const response = await fetch(TASK_API+`/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete task');
    return id;
}

export const addTask = async (name: string) => {
    const response = await fetch(TASK_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return await response.json();
};