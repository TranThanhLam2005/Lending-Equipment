import {API_BASE_URL, DEFAULT_HEADERS, DEFAULT_OPTIONS} from "./config";

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      let data: T;
      try {
        data = await response.json();
      } catch {
        data = {} as T;
      }

      if (!response.ok) {
        throw {
          message: `Request failed with status ${response.status}`,
          status: response.status,
          data,
        } as ApiError;
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      throw {
        message: error instanceof Error ? error.message : "Network error",
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {...options, method: "GET"});
  }

  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {...options, method: "DELETE"});
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
