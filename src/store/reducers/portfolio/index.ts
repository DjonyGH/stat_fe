import { EPortfolioAction, IPortfolioState, TPortfolioAction } from './types'

const initialState: IPortfolioState = {
  usdPrice: '',
  eurPrice: '',
  fxusPrice: '',
  fxgdPrice: '',
  fxruPrice: '',
  myTrades: [],
  myAssets: []
}

export default function portfolioReducer(state = initialState, action: TPortfolioAction): IPortfolioState {
  switch (action.type) {
    case EPortfolioAction.SET_USD_PRICE:
      return { ...state, usdPrice: action.payload }
    case EPortfolioAction.SET_EUR_PRICE:
      return { ...state, eurPrice: action.payload }
    case EPortfolioAction.SET_FXUS_PRICE:
      return { ...state, fxusPrice: action.payload }
    case EPortfolioAction.SET_FXGD_PRICE:
      return { ...state, fxgdPrice: action.payload }
    case EPortfolioAction.SET_FXRU_PRICE:
      return { ...state, fxruPrice: action.payload }
    case EPortfolioAction.SET_MY_TRADES:
      return { ...state, myTrades: action.payload }
    case EPortfolioAction.SET_MY_ASSETS:
      return { ...state, myAssets: action.payload }
    default:
      return state
  }
}
