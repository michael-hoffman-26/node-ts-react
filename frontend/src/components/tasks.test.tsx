import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ItemList from "./tasks";
import { fetchTasks, addTask, deleteTask } from "../api/tasks";

// Mock the API methods
jest.mock("../api/tasks", () => ({
    fetchTasks: jest.fn(),
    addTask: jest.fn(),
    deleteTask: jest.fn(),
}));

describe("ItemList Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("displays loading message initially", () => {
        // (fetchItems as jest.Mock).mockResolvedValueOnce([]);
        render(<ItemList />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("renders tasks after fetching", async () => {
        const mockItems = [
            { id: 1, name: "Task 1" },
            { id: 2, name: "Task 2" },
        ];
        (fetchTasks as jest.Mock).mockResolvedValueOnce(mockItems);

        render(<ItemList />);
        await waitFor(() => expect(screen.getByText(mockItems[0].name)).toBeInTheDocument());
        expect(screen.getByText(mockItems[1].name)).toBeInTheDocument();
    });

    test("adds a new task", async () => {
        const mockNewTaskName: string = "New Task";
        (fetchTasks as jest.Mock).mockResolvedValueOnce([]);
        (addTask as jest.Mock).mockResolvedValueOnce({ id: 3, name: mockNewTaskName });

        render(<ItemList />);

        await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

        const input = screen.getByPlaceholderText(/Enter new task/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: mockNewTaskName } });
        fireEvent.click(addButton);

        await waitFor(() => expect(screen.getByText(mockNewTaskName)).toBeInTheDocument());
    });

    test("deletes a task", async () => {
        const mockItems = [
            { id: 1, name: "Task 1" },
            { id: 2, name: "Task 2" },
        ];
        (fetchTasks as jest.Mock).mockResolvedValueOnce(mockItems);
        (deleteTask as jest.Mock).mockResolvedValueOnce({});

        render(<ItemList />);

        await waitFor(() => expect(screen.getByText(mockItems[0].name)).toBeInTheDocument());

        const deleteButton = screen.getAllByText(/Delete/i)[0];
        fireEvent.click(deleteButton);

        await waitFor(() =>
            expect(screen.queryByText(mockItems[0].name)).not.toBeInTheDocument()
        );
    });


    test("handles fetch errors gracefully", async () => {
        (fetchTasks as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));
        render(<ItemList />);
        await waitFor(() => expect(screen.queryByText("Task List")).toBeInTheDocument());
    });
});
