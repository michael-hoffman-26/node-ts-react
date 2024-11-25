import React, { useState, useEffect } from 'react';
import { addItem, deleteItem, fetchItems } from '../api/item';

interface Item {
    id: number;
    name: string;
}

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newTask, setNewTask] = useState<string>('');

    const loadItems = async () => {
        try {
            const data = await fetchItems();
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleDeleteItem = async (id: number) => {
        try {
            await deleteItem(id);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const newItemData = await addItem(newTask);
                setItems([...items, newItemData]); 
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
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}{' '}
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
