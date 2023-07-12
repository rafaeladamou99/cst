export const formatExecutionTime = (timeDiff: number) => {
  // Convert time difference to minutes, seconds, and milliseconds
  const minutes = Math.floor(timeDiff / 60000)
  const seconds = Math.floor((timeDiff % 60000) / 1000)
  const milliseconds = timeDiff % 1000

  // Format the time components
  const formattedTime = `${minutes}m ${seconds}s ${milliseconds}ms`

  return formattedTime
}
