export const useHandleApiError = (error: {
  response: { status: number; data: { message: string } }
}) => {
  // const statusCode = error?.response?.status
  // if (statusCode === 409 || statusCode === 401) {
  const errorMsg = error?.response?.data?.message

  return errorMsg
  // }
}
