export interface HeadingProps {
  title: string
  coloredText?: string
}

const Heading = (props: HeadingProps) => {
  const { title, coloredText } = props
  return (
    <div className="mb-10 text-center">
      <h3 className="text-7xl">
        {title}
        <br />
        {coloredText && <span className="text-violet-800">Right Here</span>}
      </h3>
    </div>
  )
}

export default Heading
