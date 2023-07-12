import api from "./AxiosConfig"

export const getSpanningTreeApi = (spanningTreeId: string) =>
  api.get("spanningtrees/" + spanningTreeId).then((response) => {
    return response.data
  })
