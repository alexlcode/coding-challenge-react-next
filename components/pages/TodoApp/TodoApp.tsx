import React from 'react'
import type { TodoItem } from '@/types/todo'
import SearchInput from '@/components/ui/SearchInput'
import TodoList from '@/components/ui/TodoList'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import './TodoApp.css'

export type TodoAppProps = {
  filteredTodos: TodoItem[]
  searchQuery: string
  loading: boolean
  error: string | null
  onSearchChange: (query: string) => void
  onSearchEnter: (query: string) => void
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onUpdateTodo: (id: string, text: string) => void
  onCreateTodo: (text: string) => void
  className?: string
  'data-testid'?: string
}

const TodoApp: React.FC<TodoAppProps> = ({
  filteredTodos,
  searchQuery,
  loading,
  error,
  onSearchChange,
  onSearchEnter,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
  onCreateTodo,
  className = '',
  'data-testid': testId,
}) => {
  const skipLinkId = `skip-link-${React.useId()}`
  const mainContentId = `main-content-${React.useId()}`
  const statusId = `app-status-${React.useId()}`

  if (loading) {
    return (
      <div className={`todo-app ${className}`} role="main" aria-label="Todo application" data-testid={testId}>
        <div 
          className="todo-app__loading" 
          role="status"
          aria-live="polite"
          aria-label="Loading todos"
          data-testid={`${testId}-loading`}
        >
          <div className="todo-app__loading-spinner" aria-hidden="true"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`todo-app ${className}`} role="main" aria-label="Todo application" data-testid={testId}>
        <div 
          className="todo-app__error" 
          role="alert" 
          aria-live="assertive"
          data-testid={`${testId}-error`}
        >
          <h1>Error Loading Todos</h1>
          <p>Error loading todos: {error}</p>
          <button 
            className="todo-app__retry-button"
            onClick={() => window.location.reload()}
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-app ${className}`} data-testid={testId}>
      {/* Skip link for keyboard navigation */}
      <a 
        href={`#${mainContentId}`}
        className="todo-app__skip-link"
        id={skipLinkId}
        data-testid={`${testId}-skip-link`}
      >
        Skip to main content
      </a>

      <header className="todo-app__header" role="banner">
        <h1 className="todo-app__title" data-testid={`${testId}-title`}>
          Todo List
        </h1>
        {/* Theme toggle removed */}
        <ThemeToggle />
      </header>

      <main 
        id={mainContentId}
        className="todo-app__main"
        role="main"
        aria-label="Todo application main content"
      >
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          onEnter={onSearchEnter}
          announceChange={true}
          data-testid={`${testId}-search`}
        />

        <section className="todo-app__content" aria-label="Todo list section">
          <TodoList
            todos={filteredTodos}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onUpdate={onUpdateTodo}
            searchQuery={searchQuery}
            onCreateTodo={onCreateTodo}
            announceChanges={true}
            data-testid={`${testId}-list`}
          />
        </section>
      </main>

      {/* Status region for app-wide announcements */}
      <div 
        id={statusId}
        className="todo-app__status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-testid={`${testId}-status`}
      >
        {/* This will be updated by the HOC for app-wide status changes */}
      </div>
    </div>
  )
}

export default TodoApp