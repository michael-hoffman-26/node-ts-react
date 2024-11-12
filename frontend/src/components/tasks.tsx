import React, { useState, useEffect } from 'react';

interface Item {
    id: number;
    name: string;
}

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTask, setNewTask] = useState<string>('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/item');
                if (!response.ok) throw new Error('Failed to fetch items');
                const data: Item[] = await response.json();
                setItems(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const deleteItem = async (id: number) => {
        try {
            const response = await fetch(`/api/item/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete item');
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const response = await fetch('/api/item', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newTask }),
                });
                if (response.ok) {
                    const newItemData: Item = await response.json();
                    setItems([...items, newItemData]); 
                    setNewTask('');
                } else {
                    console.error('Error adding task:', response.statusText);
                }
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
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}{' '}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
