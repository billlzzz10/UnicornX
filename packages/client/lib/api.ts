/**
 * API Utilities for UnicornX OS
 * Frontend API client functions
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.token = this.getStoredToken()
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('unicornx_token')
    }
    return null
  }

  private setStoredToken(token: string | null): void {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('unicornx_token', token)
      } else {
        localStorage.removeItem('unicornx_token')
      }
    }
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
          error: errorData.detail || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Authentication
  async login(username: string, password: string) {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const response = await fetch(`${this.baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      this.setStoredToken(data.access_token)
      return { data }
    } else {
      const error = await response.json().catch(() => ({}))
      return { error: error.detail || 'Login failed' }
    }
  }

  async register(userData: {
    email: string
    username: string
    password: string
    full_name?: string
  }) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async logout() {
    this.setStoredToken(null)
    return { data: { message: 'Logged out successfully' } }
  }

  async getProfile() {
    return this.request('/api/v1/auth/profile')
  }

  // Dashboard
  async getDashboardOverview() {
    return this.request('/api/v1/dashboard/overview')
  }

  async getMindBiomeData() {
    return this.request('/api/v1/dashboard/mind-biome')
  }

  async getTaskTrends(days: number = 7) {
    return this.request(`/api/v1/dashboard/trends?days=${days}`)
  }

  async getProductivityInsights() {
    return this.request('/api/v1/dashboard/insights')
  }

  async getWeeklyStats(weeks: number = 4) {
    return this.request(`/api/v1/dashboard/weekly-stats?weeks=${weeks}`)
  }

  // Projects
  async getProjects(includeArchived: boolean = false) {
    return this.request(`/api/v1/projects?include_archived=${includeArchived}`)
  }

  async getProject(projectId: string) {
    return this.request(`/api/v1/projects/${projectId}`)
  }

  async createProject(projectData: {
    name: string
    description?: string
    project_type: string
    color_scheme?: string
    metadata?: any
  }) {
    return this.request('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
  }

  async updateProject(projectId: string, projectData: any) {
    return this.request(`/api/v1/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    })
  }

  async deleteProject(projectId: string) {
    return this.request(`/api/v1/projects/${projectId}`, {
      method: 'DELETE',
    })
  }

  async getProjectStats(projectId: string) {
    return this.request(`/api/v1/projects/${projectId}/stats`)
  }

  // Tasks
  async getTasks(filters?: {
    project_id?: string
    status?: string
    limit?: number
    offset?: number
  }) {
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString())
        }
      })
    }
    const queryString = params.toString()
    return this.request(`/api/v1/tasks${queryString ? `?${queryString}` : ''}`)
  }

  async getTask(taskId: string) {
    return this.request(`/api/v1/tasks/${taskId}`)
  }

  async createTask(taskData: {
    title: string
    description?: string
    project_id: string
    effort_points?: number
    complexity_level?: number
    due_date?: string
    estimated_duration?: number
    required_energy_level?: number
    required_mood?: string
  }) {
    return this.request('/api/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    })
  }

  async updateTask(taskId: string, taskData: any) {
    return this.request(`/api/v1/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    })
  }

  async deleteTask(taskId: string) {
    return this.request(`/api/v1/tasks/${taskId}`, {
      method: 'DELETE',
    })
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token
  }

  getToken(): string | null {
    return this.token
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

// Export types
export type {
  ApiResponse,
}

// Export class for custom instances
export { ApiClient }
