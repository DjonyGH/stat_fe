import { ETradesAction, ITradesState, TTradesAction } from './types'

const initialState: ITradesState = {
  trades: []
}

export default function tradesReducer(state = initialState, action: TTradesAction): ITradesState {
  switch (action.type) {
    case ETradesAction.SET_TRADES:
      return { ...state, trades: action.payload }
    default:
      return state
  }
}
