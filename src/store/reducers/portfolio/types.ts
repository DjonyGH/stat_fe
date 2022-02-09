export interface IMyTrade {
  id: string
  date: string
  type: 'buy' | 'sale'
  ticker: 'FXUS' | 'FXGD' | 'FXRU'
  name: string
  price: number
  count: number
}

export interface IMyAsset {
  ticker: 'FXUS' | 'FXGD' | 'FXRU'
  name: string
  averagePrice: number
  count: number
  key?: string
  myTotal?: string
  currentTotal?: string
}

export interface IPortfolioState {
  usdPrice: string
  eurPrice: string
  fxusPrice: string
  fxgdPrice: string
  fxruPrice: string
  myTrades: IMyTrade[]
  myAssets: IMyAsset[]
}

export enum EPortfolioAction {
  SET_USD_PRICE = 'SET_USD_PRICE',
  SET_EUR_PRICE = 'SET_EUR_PRICE',
  SET_FXUS_PRICE = 'SET_FXUS_PRICE',
  SET_FXGD_PRICE = 'SET_FXGD_PRICE',
  SET_FXRU_PRICE = 'SET_FXRU_PRICE',
  SET_MY_TRADES = 'SET_MY_TRADES',
  SET_MY_ASSETS = 'SET_MY_ASSETS'
}

export interface ISetUsdPriceAction {
  type: EPortfolioAction.SET_USD_PRICE
  payload: string
}

export interface ISetEurPriceAction {
  type: EPortfolioAction.SET_EUR_PRICE
  payload: string
}

export interface ISetFxusPriceAction {
  type: EPortfolioAction.SET_FXUS_PRICE
  payload: string
}

export interface ISetFxgdPriceAction {
  type: EPortfolioAction.SET_FXGD_PRICE
  payload: string
}

export interface ISetFxruPriceAction {
  type: EPortfolioAction.SET_FXRU_PRICE
  payload: string
}

export interface ISetMyTradesAction {
  type: EPortfolioAction.SET_MY_TRADES
  payload: IMyTrade[]
}

export interface ISetMyAssetsAction {
  type: EPortfolioAction.SET_MY_ASSETS
  payload: IMyAsset[]
}

export type TPortfolioAction =
  | ISetUsdPriceAction
  | ISetEurPriceAction
  | ISetFxusPriceAction
  | ISetFxgdPriceAction
  | ISetFxruPriceAction
  | ISetMyTradesAction
  | ISetMyAssetsAction
