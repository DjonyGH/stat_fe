import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { issuersActionCreator } from '../store/reducers/issuers/action-creators'
import { tradesActionCreator } from '../store/reducers/trades/action-creators'
import { TIssuer } from '../store/reducers/issuers/types'
import { AutoComplete } from 'antd'
import { defineRange } from '../utils/defineRange'
import StatChart from '../components/StatChart'
import { changePrice } from '../utils/changePrice'
import { prepareDate } from '../utils/prepareDate'

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
      const changeLastPrice = changePrice(lastTrade)
      const lastTradeRange = defineRange(changeLastPrice)
      const rowStat: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      trades.forEach((trade, index) => {
        const changeCurrentPrice = changePrice(trade)
        const tradeRange = defineRange(changeCurrentPrice)

        if (tradeRange === lastTradeRange && index < trades.length - 1) {
          const nextTrade = trades[index + 1]
          const changeNextPrice = changePrice(nextTrade)
          const nextTradeRange = defineRange(changeNextPrice)

          rowStat[nextTradeRange]++
        }
      })
      const sum = rowStat.reduce((acc, item) => acc + item, 0)
      const stat = rowStat.map((item) => +((item / sum) * 100).toFixed(1))
      setStat(stat)
    }
  }, [trades]) //eslint-disable-line

  const selectIssuer = (value: string, option: any) =>
    dispatch(issuersActionCreator.setSelectedIssuer({ id: option.key, name: value }))

  // console.log('>>>', stat)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      {!!trades.length && (
        <div>
          Дата: {prepareDate(lastTradeDate)}, Открытие: {trades[trades.length - 1].open}, Закрытие:{' '}
          {trades[trades.length - 1].close}, Изменение: {changePrice(trades[trades.length - 1]).toFixed(2)}%
        </div>
      )}
      {!!stat.length && <StatChart data={stat} />}
    </div>
  )
}

export default RussianStockPage
