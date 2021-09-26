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
  lastTradeDate: string
}

export enum ETradesAction {
  SET_TRADES = 'SET_TRADES',
  SET_LAST_TRADE_DATE = 'SET_LAST_TRADE_DATE'
}

export interface ISetTradesAction {
  type: ETradesAction.SET_TRADES
  payload: TTrade[]
}

export interface ISetLastTradeDateAction {
  type: ETradesAction.SET_LAST_TRADE_DATE
  payload: string
}

export type TTradesAction = ISetTradesAction | ISetLastTradeDateAction
