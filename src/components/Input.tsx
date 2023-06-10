import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage: string
  hasError: boolean
}

export function Input({
  label,
  name,
  errorMessage,
  hasError,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-zinc-300">
          {label}
        </label>
        <input
          className="bg-zinc-800 text-zinc-100 p-2 rounded focus:ring-0 placeholder:text-zinc-600"
          name={name}
          {...rest}
        />
      </div>
      {hasError ? (
        <span className="text-red-500 break-words block">{errorMessage}</span>
      ) : (
        ''
      )}
    </div>
  )
}
