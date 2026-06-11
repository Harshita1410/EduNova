type ButtonProps = {
  text: string
}

function Button({ text }: ButtonProps) {
  return (
    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition w-full">
      {text}
    </button>
  )
}

export default Button