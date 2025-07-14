import React, { useMemo, useEffect, useRef } from 'react'
import type { TodoListProps } from './TodoList'

export type WithTodoListProps = {
  todos: TodoListProps['todos']
  onToggle: TodoListProps['onToggle']
  onDelete: TodoListProps['onDelete']
  onUpdate: TodoListProps['onUpdate']
  searchQuery?: TodoListProps['searchQuery']
  onCreateTodo?: TodoListProps['onCreateTodo']
  className?: TodoListProps['className']
  announceChanges?: TodoListProps['announceChanges']
  'data-testid'?: TodoListProps['data-testid']
}

export const withTodoListLogic = (Component: React.ComponentType<TodoListProps>) => {
  const WrappedComponent = React.memo<WithTodoListProps>((props) => {
    const { todos, announceChanges = true, ...restProps } = props
    const previousTodosRef = useRef<typeof todos>([])
    const statusRef = useRef<HTMLDivElement>(null)

    const memoizedTodos = useMemo(() => todos, [todos])

    // Announce changes for screen readers
    useEffect(() => {
      if (!announceChanges) return

      const previousTodos = previousTodosRef.current
      const currentTodos = todos

      if (previousTodos.length !== currentTodos.length) {
        const change = currentTodos.length > previousTodos.length ? 'added' : 'removed'
        const count = Math.abs(currentTodos.length - previousTodos.length)
        const message = `${count} todo${count === 1 ? '' : 's'} ${change}. ${currentTodos.length} total.`
        
        // Announce the change
        if (statusRef.current) {
          statusRef.current.textContent = message
          // Clear after announcement
          setTimeout(() => {
            if (statusRef.current) {
              statusRef.current.textContent = ''
            }
          }, 1000)
        }
      }

      previousTodosRef.current = currentTodos
    }, [todos, announceChanges])

    return (
      <>
        <Component
          todos={memoizedTodos}
          announceChanges={announceChanges}
          {...restProps}
        />
        {announceChanges && (
          <div 
            ref={statusRef}
            className="todo-list__announcements"
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
        )}
      </>
    )
  })

  WrappedComponent.displayName = `withTodoListLogic(${Component.displayName || Component.name})`

  return WrappedComponent
}