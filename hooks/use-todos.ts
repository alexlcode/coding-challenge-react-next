"use client"

import { useState, useEffect, useCallback } from "react"
import type { TodoItem } from "@/types/todo"

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos from API
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/todos")

      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`)
      }

      const data = await response.json()
      setTodos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  // Add a new todo
  const addTodo = useCallback(async (text: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.statusText}`)
      }

      const newTodo = await response.json()
      setTodos((prev) => [...prev, newTodo])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add todo")
    }
  }, [])

  // Update a todo
  const updateTodo = useCallback(async (id: string, text: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.statusText}`)
      }

      const updatedTodo = await response.json()
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo")
    }
  }, [])

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}/toggle`, {
        method: "PATCH",
      })

      if (!response.ok) {
        throw new Error(`Failed to toggle todo: ${response.statusText}`)
      }

      const updatedTodo = await response.json()
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle todo")
    }
  }, [])

  // Delete a todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.statusText}`)
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo")
    }
  }, [])

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  }
}
