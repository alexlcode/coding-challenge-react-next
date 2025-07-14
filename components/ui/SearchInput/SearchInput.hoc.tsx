import React, { useRef } from 'react'
import type { SearchInputProps } from './SearchInput'

export type WithSearchInputProps = {
  value: string
  onChange: (value: string) => void
  onEnter: (value: string) => void
  onClear?: () => void
  placeholder?: string
  label?: string
  helpText?: string
  className?: string
  announceChange?: boolean
  'data-testid'?: string
}

export const withSearchInputLogic = (Component: React.ComponentType<SearchInputProps>) => {
  const WrappedComponent = React.memo<WithSearchInputProps>(({
    value,
    onChange,
    onEnter,
    onClear,
    announceChange = false,
    ...props
  }) => {
    const searchInputRef = useRef<HTMLTextAreaElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (value.trim()) {
          onEnter(value.trim())
          onChange("")
          if (searchInputRef.current) {
            searchInputRef.current.style.height = "auto"
          }
        }
      }
    }

    const handleChange = (newValue: string) => {
      onChange(newValue)
    }

    return (
      <Component
        ref={searchInputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        announceChange={announceChange}
        {...props}
      />
    )
  })

  WrappedComponent.displayName = `withSearchInputLogic(${Component.displayName || Component.name})`

  return WrappedComponent
}