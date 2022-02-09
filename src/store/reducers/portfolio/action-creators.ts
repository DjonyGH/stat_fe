import { TAppDispatch } from '../..'
import { generalActionCreator } from '../general/action-creators'
import {
  EPortfolioAction,
  ISetUsdPriceAction,
  ISetEurPriceAction,
  ISetFxusPriceAction,
  ISetFxgdPriceAction,
  ISetFxruPriceAction,
  IMyTrade,
  ISetMyTradesAction,
  IMyAsset,
  ISetMyAssetsAction
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
  setMyTrades: (myTrades: IMyTrade[]): ISetMyTradesAction => ({
    type: EPortfolioAction.SET_MY_TRADES,
    payload: myTrades
  }),
  setMyAssets: (myAssets: IMyAsset[]): ISetMyAssetsAction => ({
    type: EPortfolioAction.SET_MY_ASSETS,
    payload: myAssets
  }),

  fetchFXUS: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/securities/FXUS/trades.json`)

      const data = await response.json()

      const fxusPrice: string = `${data.trades.data[data.trades.data.length - 1][4]}`

      dispatch(portfolioActionCreator.setFxusPrice(fxusPrice))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchFXGD: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/securities/FXGD/trades.json`)

      const data = await response.json()

      const fxgdPrice: string = `${data.trades.data[data.trades.data.length - 1][4]}`

      dispatch(portfolioActionCreator.setFxgdPrice(fxgdPrice))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchFXRU: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/securities/FXRU/trades.json`)

      const data = await response.json()

      const fxruPrice: string = `${data.trades.data[data.trades.data.length - 1][4]}`

      dispatch(portfolioActionCreator.setFxruPrice(fxruPrice))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },

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
  },
  fetchMyTrades: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/14WW2lqmXB60NRpVV4pTret9Eb-5tvelN5TmxpEGhMg0/gviz/tq`
      )

      const data = JSON.parse((await response.text()).substring(47).slice(0, -2))
        .table.rows.filter((item: any, idx: number) => idx !== 0)
        .map((item: any) => item.c)

      const myTrades: IMyTrade[] = data.map((item: any) => ({
        id: item[0].v,
        date: item[1].v,
        type: item[2].v,
        ticker: item[3].v,
        name: item[4].v,
        price: +item[5].v,
        count: +item[6].v
      }))

      const myAssets: IMyAsset[] = myTrades
        .reduce((acc: IMyAsset[], trade: IMyTrade) => {
          if (!acc.some((item) => item.ticker === trade.ticker)) {
            acc.push({
              ticker: trade.ticker,
              name: trade.name,
              averagePrice: trade.price * trade.count,
              count: trade.count
            })
          } else {
            const asset = acc.find((item) => item.ticker === trade.ticker)
            if (trade.type === 'buy') {
              asset && (asset.averagePrice = asset.averagePrice + trade.price * trade.count)
              asset && (asset.count = asset.count + trade.count)
            } else {
              if (asset?.count === trade.count) {
                acc = acc.filter((item) => item.ticker !== asset.ticker)
              } else {
                asset && (asset.averagePrice = asset.averagePrice - (asset.averagePrice / asset.count) * trade.count)
                asset && (asset.count = asset.count - trade.count)
              }
            }
          }
          return acc
        }, [] as IMyAsset[])
        .map((asset: IMyAsset) => ({
          ...asset,
          averagePrice: asset.averagePrice / asset.count
        }))

      dispatch(portfolioActionCreator.setMyTrades(myTrades))
      dispatch(portfolioActionCreator.setMyAssets(myAssets))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  }
}
