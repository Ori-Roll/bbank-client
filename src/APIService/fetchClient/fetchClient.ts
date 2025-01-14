import { API_BASE_URL } from '../config/config';

export class HttpError extends Error {
  constructor(public response: Response, message?: string) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      //TODO: Add a logout function here and a snackbar to show the user they have been logged out
      window.location.href = '/login';
    }
    throw new HttpError(response);
  }

  return response.json();
}

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:5500', //TODO: Change this once possible!
};

type DataResponse<T> = { data: T };

export const client = {
  get: async <T>(endpoint: string): Promise<DataResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        ...defaultHeaders,
      },
    });
    return await handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    data?: unknown
  ): Promise<DataResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...defaultHeaders,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return await handleResponse<T>(response);
  },

  patch: async <T>(
    endpoint: string,
    data: unknown
  ): Promise<DataResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify(data),
    });
    return await handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<DataResponse<T>> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...defaultHeaders,
      },
    });
    return await handleResponse<T>(response);
  },
};
