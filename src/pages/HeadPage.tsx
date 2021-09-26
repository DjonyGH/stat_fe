import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { tradesActionCreator } from '../store/reducers/trades/action-creators'
import { TTrade } from '../store/reducers/trades/types'

const HeadPage: FC = () => {
  const { tradesAtLastTradeDate, lastTradeDate } = useTypedSelector((state) => state.tradesReducer)
  const dispatch = useDispatch()

  const [growthLeadres, setGrowthLeaders] = useState<TTrade[]>([])
  const [fallLeadres, setFallLeaders] = useState<TTrade[]>([])

  useEffect(() => {
    dispatch(tradesActionCreator.fetchLastTradeDate())
  }, []) //eslint-disable-line

  useEffect(() => {
    lastTradeDate && dispatch(tradesActionCreator.fetchTradesAtLastTradeDate(lastTradeDate))
  }, [lastTradeDate]) //eslint-disable-line

  useEffect(() => {
    if (tradesAtLastTradeDate.length) {
      const sortTrades: TTrade[] = tradesAtLastTradeDate.sort(
        (a, b) => (a.close - a.open) / a.open - (b.close - b.open) / b.open
      )
      setGrowthLeaders(sortTrades.slice(-5))
      setFallLeaders(sortTrades.slice(0, 5))
      // console.log('sortTrades: ', sortTrades)
    }
  }, [tradesAtLastTradeDate]) //eslint-disable-line

  console.log('lastTradeDate: ', lastTradeDate)
  console.log('tradesAtLastTradeDate: ', tradesAtLastTradeDate)
  console.log('growthLeadres: ', growthLeadres)
  console.log('fallLeadres: ', fallLeadres)

  return <div>Главная</div>
}

export default HeadPage
