import { ETradesAction, ITradesState, TTradesAction } from './types'

const initialState: ITradesState = {
  trades: [],
  tradesAtLastTradeDate: [],
  lastTradeDate: ''
}

export default function tradesReducer(state = initialState, action: TTradesAction): ITradesState {
  switch (action.type) {
    case ETradesAction.SET_TRADES:
      return { ...state, trades: action.payload }
    case ETradesAction.SET_TRADES_AT_LAST_TRADE_DATE:
      return { ...state, tradesAtLastTradeDate: action.payload }
    case ETradesAction.SET_LAST_TRADE_DATE:
      return { ...state, lastTradeDate: action.payload }
    default:
      return state
  }
}
