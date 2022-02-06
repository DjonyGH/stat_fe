export interface IPortfolioState {
  usdPrice: string
  eurPrice: string
  fxusPrice: string
  fxgdPrice: string
  fxruPrice: string
}

export enum EPortfolioAction {
  SET_USD_PRICE = 'SET_USD_PRICE',
  SET_EUR_PRICE = 'SET_EUR_PRICE',
  SET_FXUS_PRICE = 'SET_FXUS_PRICE',
  SET_FXGD_PRICE = 'SET_FXGD_PRICE',
  SET_FXRU_PRICE = 'SET_FXRU_PRICE'
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

export type TPortfolioAction =
  | ISetUsdPriceAction
  | ISetEurPriceAction
  | ISetFxusPriceAction
  | ISetFxgdPriceAction
  | ISetFxruPriceAction
