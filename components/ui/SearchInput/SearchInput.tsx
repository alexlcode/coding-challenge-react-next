import React from 'react'
import './SearchInput.css'

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  label?: string
  helpText?: string
  errorMessage?: string
  className?: string
  'data-testid'?: string
  isRequired?: boolean
  announceChange?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "Type to search or press Enter to add new todo...",
  label = "Search or add new todo",
  helpText = "Press Enter to add a new todo, or type to filter existing todos",
  errorMessage,
  className = '',
  'data-testid': testId,
  isRequired = false,
  announceChange = false,
  ...props
}) => {
  const inputId = `search-input-${React.useId()}`
  const helpId = `${inputId}-help`
  const errorId = `${inputId}-error`
  const statusId = `${inputId}-status`

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    onChange(textarea.value)

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const describedBy = [
    helpId,
    errorMessage ? errorId : null,
    announceChange ? statusId : null
  ].filter(Boolean).join(' ')

  return (
    <div className={`search-input ${className}`} data-testid={testId}>
      <label htmlFor={inputId} className="search-input__label">
        {label}
        {isRequired && <span className="search-input__required" aria-label="required">*</span>}
      </label>
      
      <textarea
        id={inputId}
        className={`search-input__textarea ${errorMessage ? 'search-input__textarea--error' : ''}`}
        value={value}
        onChange={handleInput}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={1}
        aria-describedby={describedBy}
        aria-invalid={errorMessage ? 'true' : 'false'}
        aria-required={isRequired}
        data-testid={`${testId}-textarea`}
        {...props}
      />
      
      <div id={helpId} className="search-input__help" data-testid={`${testId}-help`}>
        {helpText}
      </div>
      
      {errorMessage && (
        <div 
          id={errorId} 
          className="search-input__error" 
          role="alert" 
          aria-live="polite"
          data-testid={`${testId}-error`}
        >
          {errorMessage}
        </div>
      )}
      
      {announceChange && (
        <div 
          id={statusId} 
          className="search-input__status" 
          role="status" 
          aria-live="polite"
          aria-atomic="true"
          data-testid={`${testId}-status`}
        >
          {value.length > 0 ? `${value.length} characters entered` : 'Input cleared'}
        </div>
      )}
    </div>
  )
}

export default SearchInput