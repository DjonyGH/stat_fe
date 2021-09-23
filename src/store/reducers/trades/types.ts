export type TTrade = {
  id: string
  name: string
  date: string
  open: number
  close: number
  hight: number
  low: number
  volume: number
}

export interface ITradesState {
  trades: TTrade[]
}

export enum ETradesAction {
  SET_TRADES = 'SET_TRADES'
}

export interface ISetTradesAction {
  type: ETradesAction.SET_TRADES
  payload: TTrade[]
}

export type TTradesAction = ISetTradesAction
