import cn from 'classnames'
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <input
      ref={ref}
      {...rest}
      className={cn(
        'block w-full rounded-md border border-violet-800 bg-violet-50 p-4 shadow-md',
        className
      )}
    ></input>
  )
})

export default Input
