import { TTrade } from '../store/reducers/trades/types'

export const changePrice = (trade: TTrade) => {
  return ((trade.close - trade.open) / trade.open) * 100
}
