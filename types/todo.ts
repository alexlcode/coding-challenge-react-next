export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateTodoRequest {
  text: string
}

export interface UpdateTodoRequest {
  text: string
}

export interface TodoApiResponse {
  success: boolean
  data?: TodoItem | TodoItem[]
  error?: string
}
