import type { TodoItem } from "@/types/todo"

export const mockTodos: TodoItem[] = [
  {
    id: "1",
    text: "Learn React and Next.js",
    completed: true,
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  },
  {
    id: "2",
    text: "Implement dark mode toggle",
    completed: true,
    createdAt: new Date("2024-01-03T09:15:00Z"),
    updatedAt: new Date("2024-01-03T09:15:00Z"),
  },
  {
    id: "3",
    text: "Build an accessible todo app",
    completed: false,
    createdAt: new Date("2024-01-02T14:30:00Z"),
    updatedAt: new Date("2024-01-02T14:30:00Z"),
  },
  {
    id: "4",
    text: "Add keyboard navigation support",
    completed: true,
    createdAt: new Date("2024-01-04T16:45:00Z"),
    updatedAt: new Date("2024-01-04T16:45:00Z"),
  },
  {
    id: "5",
    text: "Write comprehensive tests",
    completed: false,
    createdAt: new Date("2024-01-05T11:20:00Z"),
    updatedAt: new Date("2024-01-05T11:20:00Z"),
  },
]

// In-memory storage for demo purposes
let todos = [...mockTodos]

export function getTodos(): TodoItem[] {
  return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getTodoById(id: string): TodoItem | undefined {
  return todos.find((todo) => todo.id === id)
}

export function createTodo(text: string): TodoItem {
  const newTodo: TodoItem = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  todos.push(newTodo)
  return newTodo
}

export function updateTodo(id: string, text: string): TodoItem | null {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex === -1) return null

  todos[todoIndex] = {
    ...todos[todoIndex],
    text,
    updatedAt: new Date(),
  }

  return todos[todoIndex]
}

export function toggleTodo(id: string): TodoItem | null {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex === -1) return null

  todos[todoIndex] = {
    ...todos[todoIndex],
    completed: !todos[todoIndex].completed,
    updatedAt: new Date(),
  }

  return todos[todoIndex]
}

export function deleteTodo(id: string): boolean {
  const initialLength = todos.length
  todos = todos.filter((todo) => todo.id !== id)
  return todos.length < initialLength
}
