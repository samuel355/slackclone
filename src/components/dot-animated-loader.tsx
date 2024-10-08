

const DotAnimatedLoader = () => {
  return (
    <div className="flex space-x-2 items-center justify-center">
      <span className="sr-only">Loading...</span>
      <div className="h-3 w-3 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-3 w-3 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-3 w-3 bg-gray-900 dark:bg-gray-100 rounded-full animate-bounce" />
    </div>
  )
}

export default DotAnimatedLoader
