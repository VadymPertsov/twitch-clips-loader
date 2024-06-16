import { ReactNode } from 'react'
import Container from './Container'
import cn from 'classnames'
import Heading, { HeadingProps } from '../Heading'

interface LayoutProps extends HeadingProps {
  children: ReactNode
  className?: string
}

const Layout = (props: LayoutProps) => {
  const { children, className, ...rest } = props

  return (
    <section className={cn('pt-10', className)}>
      <Container>
        <Heading {...rest} />
        {children}
      </Container>
    </section>
  )
}

export default Layout
