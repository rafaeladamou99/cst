export const useHandleApiError = (error: {
  response: { status: number; data: { message: string } }
}) => {
  const errorMsg = error?.response?.data?.message

  return errorMsg
}
