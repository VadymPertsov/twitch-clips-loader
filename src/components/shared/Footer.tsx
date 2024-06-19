import ActionTag from '../ui/ActionTag'
import Container from './Layout/Container'

const Footer = () => {
  return (
    <Container className="shadow-violet-150 flex items-center justify-center gap-3 py-5 shadow-inner md:flex-wrap">
      <p>Developed by:</p>
      <ActionTag target="_blank" href="https://github.com/VadymPertsov">
        VadymPertsov
      </ActionTag>
    </Container>
  )
}

export default Footer
