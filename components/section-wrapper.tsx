import { ReactNode } from 'react'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: ReactNode
  gradient?: boolean
}

export function SectionWrapper({
  id,
  className = '',
  children,
  gradient = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`
        relative w-full py-20 md:py-32 px-4 md:px-8
        ${gradient ? 'bg-gradient-to-b from-transparent via-primary/5 to-transparent' : ''}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}
