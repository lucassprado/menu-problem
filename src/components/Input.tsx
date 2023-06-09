import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, name, ...rest }: InputProps) {
  return (
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
  )
}
