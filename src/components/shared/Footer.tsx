import Container from './Layout/Container'

const Footer = () => {
  return (
    <footer className="shadow-violet-150 mt-10 shadow-inner">
      <Container className="flex items-center justify-center gap-3 py-5 md:flex-wrap">
        <p>Developed by:</p>
        <a
          target="_blank"
          href="https://github.com/VadymPertsov"
          className="block font-extralight italic underline hover:text-violet-800"
        >
          Vadym Pertsov
        </a>
      </Container>
    </footer>
  )
}

export default Footer
