import { config } from "dotenv";

config();

export const CURRENT_TASK_REPO: string = 'in-memory-cache' // This value can be determined also dynamically, using an env var or other strategy

export const PORT = process.env.PORT || 8000;