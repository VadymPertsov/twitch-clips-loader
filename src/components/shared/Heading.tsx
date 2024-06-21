export interface HeadingProps {
  title: string
  coloredText?: string
}

const Heading = (props: HeadingProps) => {
  const { title, coloredText } = props
  return (
    <div className="mb-10 text-center md:mb-6">
      <h3 className="text-4xl md:text-2xl">
        {title}
        <br />
        {coloredText && <span className="text-violet-800">{coloredText}</span>}
      </h3>
    </div>
  )
}

export default Heading
