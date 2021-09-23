import { TAppDispatch } from '../..'
import { generalActionCreator } from '../general/action-creators'
import { ETradesAction, ISetTradesAction, TTrade } from './types'

export const tradesActionCreator = {
  setTrades: (trades: TTrade[]): ISetTradesAction => ({ type: ETradesAction.SET_TRADES, payload: trades }),

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
  }
}
