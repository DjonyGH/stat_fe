import { TAppDispatch } from '../..'
import { generalActionCreator } from '../general/action-creators'
import {
  ETradesAction,
  ISetTradesAction,
  TTrade,
  ISetTradesAtLastTradeDateAction,
  ISetLastTradeDateAction
} from './types'

export const tradesActionCreator = {
  setTrades: (trades: TTrade[]): ISetTradesAction => ({ type: ETradesAction.SET_TRADES, payload: trades }),
  setTradesAtLastTradeDate: (trades: TTrade[]): ISetTradesAtLastTradeDateAction => ({
    type: ETradesAction.SET_TRADES_AT_LAST_TRADE_DATE,
    payload: trades
  }),
  setLastTradeDate: (lastTradeDate: string): ISetLastTradeDateAction => ({
    type: ETradesAction.SET_LAST_TRADE_DATE,
    payload: lastTradeDate
  }),

  fetchTrades: (issuerId: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(
        `http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities/${issuerId}.json?from=2020-01-01&till=2021-09-21`
      )

      const data = await response.json()
      const trades: TTrade[] = data.history.data.map((trade: any) => ({
        id: trade[3],
        name: trade[2],
        date: trade[1],
        open: trade[6],
        close: trade[11],
        high: trade[8],
        low: trade[7],
        volume: trade[5]
      }))
      dispatch(tradesActionCreator.setTrades(trades))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchTradesAtLastTradeDate: (date: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(
        `http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/securities.json?date=${date}&numtrades=1000&tradingsession=3`
      )

      const data = await response.json()
      const trades: TTrade[] = data.history.data.map((trade: any) => ({
        id: trade[3],
        name: trade[2],
        date: trade[1],
        open: trade[6],
        close: trade[11],
        high: trade[8],
        low: trade[7],
        volume: trade[5]
      }))
      // const sortTrades = trades.sort((a, b) => {
      //   if (b.volume > a.volume) return 1
      //   if (b.volume < a.volume) return -1
      //   return 0
      // })
      // console.log('>>>', sortTrades)

      dispatch(tradesActionCreator.setTradesAtLastTradeDate(trades))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchLastTradeDate: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch(
        `http://iss.moex.com/iss/history/engines/stock/markets/shares/boards/tqbr/dates.json?tradingsession=3`
      )

      const data = await response.json()
      const lastTradeDate: string = data.dates.data[0][1]
      dispatch(tradesActionCreator.setLastTradeDate(lastTradeDate))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  }
}
