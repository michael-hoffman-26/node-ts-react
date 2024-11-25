export const fetchItems = async () => {
    const response = await fetch('/api/item');
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
};

export const deleteItem = async (id: number) => {
    const response = await fetch(`/api/item/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete item');
    return id;
}

export const addItem = async (name: string) => {
    const response = await fetch('/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return await response.json(); // Returns the new item data
};