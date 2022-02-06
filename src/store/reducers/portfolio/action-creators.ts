import { TAppDispatch } from '../..'
import { generalActionCreator } from '../general/action-creators'
import {
  EPortfolioAction,
  ISetUsdPriceAction,
  ISetEurPriceAction,
  ISetFxusPriceAction,
  ISetFxgdPriceAction,
  ISetFxruPriceAction
} from './types'

export const portfolioActionCreator = {
  setUsdPrice: (usdPrice: string): ISetUsdPriceAction => ({ type: EPortfolioAction.SET_USD_PRICE, payload: usdPrice }),
  setEurPrice: (eurPrice: string): ISetEurPriceAction => ({ type: EPortfolioAction.SET_EUR_PRICE, payload: eurPrice }),
  setFxusPrice: (fxusPrice: string): ISetFxusPriceAction => ({
    type: EPortfolioAction.SET_FXUS_PRICE,
    payload: fxusPrice
  }),
  setFxgdPrice: (fxgdPrice: string): ISetFxgdPriceAction => ({
    type: EPortfolioAction.SET_FXGD_PRICE,
    payload: fxgdPrice
  }),
  setFxruPrice: (fxruPrice: string): ISetFxruPriceAction => ({
    type: EPortfolioAction.SET_FXRU_PRICE,
    payload: fxruPrice
  }),

  fetchCurrency: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(`https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json`)

      const data = await response.json()

      const usdPrice: string = `${data.cbrf.data[0][3]}`
      const eurPrice: string = `${data.cbrf.data[0][6]}`

      dispatch(portfolioActionCreator.setUsdPrice(usdPrice))
      dispatch(portfolioActionCreator.setEurPrice(eurPrice))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  }
}
