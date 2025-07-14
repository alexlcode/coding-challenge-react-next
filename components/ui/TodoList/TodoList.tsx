import React from 'react'
import type { TodoItem as TodoItemType } from '@/types/todo'
import TodoItem from '../TodoItem'
import './TodoList.css'

export type TodoListProps = {
  todos: TodoItemType[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, text: string) => void
  searchQuery?: string
  onCreateTodo?: (text: string) => void
  className?: string
  'data-testid'?: string
  announceChanges?: boolean
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  searchQuery = '',
  onCreateTodo,
  className = '',
  'data-testid': testId,
  announceChanges = true,
}) => {
  const statusId = `todo-list-status-${React.useId()}`
  const headingId = `todo-list-heading-${React.useId()}`

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length
  const pendingCount = totalCount - completedCount

  if (todos.length === 0 && searchQuery.trim()) {
    return (
      <div className={`todo-list__no-results ${className}`} data-testid={`${testId}-no-results`}>
        <h2 className="todo-list__heading" id={headingId}>
          No Results Found
        </h2>
        <p>No todos found matching "{searchQuery}"</p>
        {onCreateTodo && (
          <button
            className="todo-list__add-button"
            onClick={() => onCreateTodo(searchQuery.trim())}
            type="button"
            aria-describedby={headingId}
            data-testid={`${testId}-create-button`}
          >
            Create new todo: "{searchQuery}"
          </button>
        )}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className={`todo-list__empty ${className}`} data-testid={`${testId}-empty`}>
        <h2 className="todo-list__heading" id={headingId}>
          No Todos Yet
        </h2>
        <p>No todos yet. Add one above!</p>
      </div>
    )
  }

  return (
    <section className={`todo-list-container ${className}`} data-testid={testId}>
      <header className="todo-list__header">
        <h2 className="todo-list__heading" id={headingId}>
          Todo List
        </h2>
        <div className="todo-list__summary" aria-live="polite">
          {totalCount} {totalCount === 1 ? 'todo' : 'todos'} total
          {completedCount > 0 && `, ${completedCount} completed`}
          {pendingCount > 0 && `, ${pendingCount} pending`}
        </div>
      </header>

      <ul 
        className="todo-list" 
        role="list" 
        aria-labelledby={headingId}
        aria-describedby={statusId}
        data-testid={`${testId}-list`}
      >
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            itemIndex={index}
            totalItems={totalCount}
            data-testid={`${testId}-item-${todo.id}`}
          />
        ))}
      </ul>

      {announceChanges && (
        <div 
          id={statusId} 
          className="todo-list__status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          data-testid={`${testId}-status`}
        >
          {/* This will be updated by the HOC when changes occur */}
        </div>
      )}
    </section>
  )
}

export default TodoList