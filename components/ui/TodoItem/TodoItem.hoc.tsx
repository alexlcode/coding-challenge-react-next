import React, { useState } from 'react'
import TodoItem from './TodoItem'
import type { TodoItemProps } from './TodoItem'
import type { TodoItem as TodoItemType } from '@/types/todo'

export type WithTodoItemProps = {
  todo: TodoItemType
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, text: string) => void
  className?: string
  'data-testid'?: string
}

export const withTodoItemLogic = (Component: React.ComponentType<TodoItemProps>) => {
  const WrappedComponent = React.memo<WithTodoItemProps>(({
    todo,
    onToggle,
    onDelete,
    onUpdate,
    ...props
  }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState('')

    const handleEditStart = (todoItem: TodoItemType) => {
      setIsEditing(true)
      setEditText(todoItem.text)
    }

    const handleEditSave = (id: string) => {
      if (editText.trim()) {
        onUpdate(id, editText.trim())
      }
      setIsEditing(false)
      setEditText('')
    }

    const handleEditCancel = () => {
      setIsEditing(false)
      setEditText('')
    }

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      if (e.key === "Enter") {
        handleEditSave(id)
      } else if (e.key === "Escape") {
        handleEditCancel()
      }
    }

    return (
      <Component
        todo={todo}
        isEditing={isEditing}
        editText={editText}
        onToggle={onToggle}
        onDelete={onDelete}
        onEditStart={handleEditStart}
        onEditSave={handleEditSave}
        onEditCancel={handleEditCancel}
        onEditTextChange={setEditText}
        onEditKeyDown={handleEditKeyDown}
        {...props}
      />
    )
  })

  WrappedComponent.displayName = `withTodoItemLogic(${Component.displayName || Component.name})`

  return WrappedComponent
}