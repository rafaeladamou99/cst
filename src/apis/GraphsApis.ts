import api from "./AxiosConfig"

export const getGraphApi = (graphId: string) =>
  api.get("graphs/" + graphId).then((response) => {
    return response.data
  })