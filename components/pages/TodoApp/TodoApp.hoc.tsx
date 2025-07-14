import React, { useState, useMemo, useRef } from 'react'
import { useTodos } from '@/hooks/use-todos'
import type { TodoAppProps } from './TodoApp'

export type WithTodoAppProps = {
  className?: string
  'data-testid'?: string
}

export const withTodoAppLogic = (Component: React.ComponentType<TodoAppProps>) => {
  const WrappedComponent = React.memo<WithTodoAppProps>((props) => {
    const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos()
    const [searchQuery, setSearchQuery] = useState("")
    const statusRef = useRef<HTMLDivElement>(null)

    // Filter todos based on search query
    const filteredTodos = useMemo(() => {
      if (!searchQuery.trim()) {
        return todos
      }
      return todos.filter((todo) => 
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }, [todos, searchQuery])

    const handleSearchChange = (query: string) => {
      setSearchQuery(query)
    }

    const handleSearchEnter = (query: string) => {
      if (query.trim()) {
        addTodo(query.trim())
        setSearchQuery("")
        
        // Announce todo creation
        if (statusRef.current) {
          statusRef.current.textContent = `Todo "${query.trim()}" created`
          setTimeout(() => {
            if (statusRef.current) {
              statusRef.current.textContent = ''
            }
          }, 1000)
        }
      }
    }

    const handleCreateTodo = (text: string) => {
      addTodo(text)
      setSearchQuery("")
      
      // Announce todo creation
      if (statusRef.current) {
        statusRef.current.textContent = `Todo "${text}" created`
        setTimeout(() => {
          if (statusRef.current) {
            statusRef.current.textContent = ''
          }
        }, 1000)
      }
    }

    const handleToggleTodo = (id: string) => {
      const todo = todos.find(t => t.id === id)
      if (todo) {
        toggleTodo(id)
        
        // Announce status change
        if (statusRef.current) {
          const newStatus = todo.completed ? 'incomplete' : 'complete'
          statusRef.current.textContent = `Todo "${todo.text}" marked as ${newStatus}`
          setTimeout(() => {
            if (statusRef.current) {
              statusRef.current.textContent = ''
            }
          }, 1000)
        }
      }
    }

    const handleDeleteTodo = (id: string) => {
      const todo = todos.find(t => t.id === id)
      if (todo) {
        deleteTodo(id)
        
        // Announce deletion
        if (statusRef.current) {
          statusRef.current.textContent = `Todo "${todo.text}" deleted`
          setTimeout(() => {
            if (statusRef.current) {
              statusRef.current.textContent = ''
            }
          }, 1000)
        }
      }
    }

    const handleUpdateTodo = (id: string, text: string) => {
      const todo = todos.find(t => t.id === id)
      if (todo) {
        updateTodo(id, text)
        
        // Announce update
        if (statusRef.current) {
          statusRef.current.textContent = `Todo updated to "${text}"`
          setTimeout(() => {
            if (statusRef.current) {
              statusRef.current.textContent = ''
            }
          }, 1000)
        }
      }
    }

    return (
      <>
        <Component
          filteredTodos={filteredTodos}
          searchQuery={searchQuery}
          loading={loading}
          error={error}
          onSearchChange={handleSearchChange}
          onSearchEnter={handleSearchEnter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
          onCreateTodo={handleCreateTodo}
          {...props}
        />
        <div 
          ref={statusRef}
          className="todo-app__announcements"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden'
          }}
        />
      </>
    )
  })

  WrappedComponent.displayName = `withTodoAppLogic(${Component.displayName || Component.name})`

  return WrappedComponent
}