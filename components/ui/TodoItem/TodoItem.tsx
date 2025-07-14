import React from 'react'
import type { TodoItem as TodoItemType } from '@/types/todo'
import './TodoItem.css'

export type TodoItemProps = {
  todo: TodoItemType
  isEditing: boolean
  editText: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEditStart: (todo: TodoItemType) => void
  onEditSave: (id: string) => void
  onEditCancel: () => void
  onEditTextChange: (text: string) => void
  onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: string) => void
  className?: string
  'data-testid'?: string
  itemIndex?: number
  totalItems?: number
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  editText,
  onToggle,
  onDelete,
  onEditStart,
  onEditSave,
  onEditCancel,
  onEditTextChange,
  onEditKeyDown,
  className = '',
  'data-testid': testId,
  itemIndex = 0,
  totalItems = 0,
}) => {
  const checkboxId = `todo-checkbox-${todo.id}`
  const textId = `todo-text-${todo.id}`
  const editId = `todo-edit-${todo.id}`
  const statusId = `todo-status-${todo.id}`

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onEditKeyDown(e, todo.id)
  }

  const completionStatus = todo.completed ? 'completed' : 'pending'
  const positionInfo = totalItems > 0 ? `${itemIndex + 1} of ${totalItems}` : ''

  return (
    <li 
      className={`todo-item ${className}`}
      role="listitem"
      aria-labelledby={textId}
      aria-describedby={`${statusId} ${positionInfo ? `${statusId}-position` : ''}`}
      data-testid={testId}
    >
      <div>
        <input
          type="checkbox"
          id={checkboxId}
          className="todo-item__checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-describedby={textId}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
          data-testid={`${testId}-checkbox`}
        />

        {isEditing ? (
          <>
            <label htmlFor={editId}>
              Edit todo text
            </label>
            <input
              type="text"
              id={editId}
              value={editText}
              onChange={(e) => onEditTextChange(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={() => onEditSave(todo.id)}
              autoFocus
              aria-describedby={`${statusId} ${editId}-help`}
              data-testid={`${testId}-edit-input`}
            />
            <div id={`${editId}-help`}>
              Press Enter to save, Escape to cancel
            </div>
          </>
        ) : (
          <label 
            htmlFor={checkboxId}
            id={textId} 
            className="todo-item__text"
            data-testid={`${testId}-text`}
          >
            {todo.text}
          </label>
        )}
      </div>

      <div className="todo-item__actions" role="group" aria-label="Todo actions">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => onEditSave(todo.id)}
              aria-label={`Save changes to "${todo.text}"`}
              data-testid={`${testId}-save`}
            >
              <span aria-hidden="true">✓</span>
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onEditCancel}
              aria-label={`Cancel editing "${todo.text}"`}
              data-testid={`${testId}-cancel`}
            >
              <span aria-hidden="true">✕</span>
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEditStart(todo)}
              aria-label={`Edit todo: ${todo.text}`}
              data-testid={`${testId}-edit`}
            >
              <span aria-hidden="true">✏️</span>
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete todo: ${todo.text}`}
              data-testid={`${testId}-delete`}
            >
              <span aria-hidden="true">🗑️</span>
              <span>Delete</span>
            </button>
          </>
        )}
      </div>

      {/* Status information for screen readers */}
      <div 
        id={statusId} 
        className="todo-item__status"
        aria-live="polite"
        aria-atomic="true"
      >
        Status: {completionStatus}
      </div>
      
      {positionInfo && (
        <div 
          id={`${statusId}-position`} 
          className="todo-item__position"
        >
          Position: {positionInfo}
        </div>
      )}
    </li>
  )
}

export default TodoItem