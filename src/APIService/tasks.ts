import { client } from './fetchClient/fetchClient';
import { TaskData } from '../types/schemaTypes';

const tasksService = {
  getUserTasks: () => client.get<TaskData[]>('/tasks'),
  getTask: (id: string) => client.get<TaskData>(`/tasks/${id}`),
  createTask: (taskData: Partial<TaskData>) =>
    client.post<TaskData>('/tasks', taskData),
  updateTask: (taskData: Partial<TaskData>, taskId: string) =>
    client.patch<TaskData>(`/tasks/${taskId}`, taskData),
  deleteTask: (id: string) => client.delete<TaskData>(`/tasks/${id}`),
};

export default tasksService;
