import { ReactNode } from 'react'
import Container from './Container'
import cn from 'classnames'
import Heading, { HeadingProps } from '../Heading'

export interface LayoutProps extends Partial<HeadingProps> {
  children: ReactNode
  className?: string
}

const Layout = (props: LayoutProps) => {
  const { children, className, title, coloredText } = props

  return (
    <section className={cn('pb-5 pt-10 shadow-md shadow-violet-50', className)}>
      <Container>
        {title && <Heading title={title} coloredText={coloredText} />}
        {children}
      </Container>
    </section>
  )
}

export default Layout
