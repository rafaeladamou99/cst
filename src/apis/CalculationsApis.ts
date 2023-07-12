import api from "./AxiosConfig"
import { useHandleApiError } from "./utils"

export type SpanningTree = {
  spanningTree: string
  weightSum: number
  constraint: string
  constraintAmount: number
  elapsedTime: number
}

export interface Calculation {
  id: string
  title: string
  description: string
  graph: string
  spanningTrees: SpanningTree[]
  ownerId: string
}

export const postCalculationApi = (
  title: string,
  description: string,
  graph: number[][],
  constraint: string,
  constraintAmount: number | undefined
) =>
  api
    .post("calculations", {
      title,
      description,
      graph,
      constraint,
      constraintAmount
    })
    .then((response) => {})
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const generateSpanningTreeApi = (
  calcId: string,
  constraint: string,
  constraintAmount: number | undefined
) =>
  api
    .patch("calculations/" + calcId, {
      constraint,
      constraintAmount
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const getUserCalculationsApi = () =>
  api
    .get("calculations")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const getCalculationApi = (calcId: string) =>
  api
    .get("calculations/" + calcId)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const generateGraphApi = (graphSize: number, maxWeight: number) =>
  api
    .get("calculations/generateGraph", {
      params: { graphSize, maxWeight }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })
