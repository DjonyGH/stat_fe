import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { issuersActionCreator } from '../store/reducers/issuers/action-creators'
import { tradesActionCreator } from '../store/reducers/trades/action-creators'
import { TIssuer } from '../store/reducers/issuers/types'
import { AutoComplete } from 'antd'
import { defineRange } from '../utils/defineRange'

const { Option } = AutoComplete

const RussianStockPage: FC = () => {
  const { issuers, selectedIssuer } = useTypedSelector((state) => state.issuersReducer)
  const { trades, lastTradeDate } = useTypedSelector((state) => state.tradesReducer)
  const dispatch = useDispatch()

  const [stat, setStat] = useState<number[]>([])

  useEffect(() => {
    dispatch(issuersActionCreator.fetchIssuers())
    dispatch(tradesActionCreator.fetchLastTradeDate())
  }, []) //eslint-disable-line

  useEffect(() => {
    if (selectedIssuer && lastTradeDate) {
      dispatch(tradesActionCreator.fetchTrades(selectedIssuer.id, lastTradeDate))
    }
  }, [selectedIssuer]) //eslint-disable-line

  useEffect(() => {
    if (trades.length) {
      const lastTrade = trades[trades.length - 1]
      const changeLastPrice = ((lastTrade.close - lastTrade.open) / lastTrade.open) * 100
      const lastTradeRange = defineRange(changeLastPrice)
      const rowStat: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      trades.forEach((trade, index) => {
        const changePrice = ((trade.close - trade.open) / trade.open) * 100
        const tradeRange = defineRange(changePrice)
        // console.log('>', index)

        if (tradeRange === lastTradeRange && index < trades.length - 1) {
          const nextTrade = trades[index + 1]
          const changeNextPrice = ((nextTrade.close - nextTrade.open) / nextTrade.open) * 100
          const nextTradeRange = defineRange(changeNextPrice)
          // console.log('>', stat[nextTradeRange])
          rowStat[nextTradeRange]++
          // console.log('>>', stat[nextTradeRange])
        }
      })
      const sum = rowStat.reduce((acc, item) => acc + item, 0)
      const stat = rowStat.map((item) => +((item / sum) * 100).toFixed(1))
      setStat(stat)
    }
  }, [trades]) //eslint-disable-line

  const selectIssuer = (value: string, option: any) =>
    dispatch(issuersActionCreator.setSelectedIssuer({ id: option.key, name: value }))

  console.log('>>>', stat)

  return (
    <div>
      <AutoComplete
        style={{ width: 200, marginTop: 20 }}
        placeholder="Выберите..."
        onSelect={selectIssuer}
        filterOption={true}
        defaultActiveFirstOption={true}
      >
        {issuers.map((issuer: TIssuer) => (
          <Option key={issuer.id} value={issuer.name}>
            {issuer.name}
          </Option>
        ))}
      </AutoComplete>
    </div>
  )
}

export default RussianStockPage
