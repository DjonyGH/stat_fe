import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import LeaderChart from '../components/LeaderChart'
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
        (a, b) => (b.close - b.open) / b.open - (a.close - a.open) / a.open
      )
      setGrowthLeaders(sortTrades.slice(0, 5))
      setFallLeaders(sortTrades.slice(-5))
    }
  }, [tradesAtLastTradeDate]) //eslint-disable-line

  // console.log('lastTradeDate: ', lastTradeDate)
  // tradesAtLastTradeDate &&
  //   console.log(
  //     'tradesAtLastTradeDate: ',
  //     tradesAtLastTradeDate.sort((a, b) => b.volume - a.volume)
  //   )
  // console.log('growthLeadres: ', growthLeadres)
  // console.log('fallLeadres: ', fallLeadres)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%', height: '500px' }}>
          {growthLeadres.length && <LeaderChart rawData={growthLeadres} leadersOf={'growth'} date={lastTradeDate} />}
        </div>
        <div style={{ width: '48%', height: '500px' }}>
          {fallLeadres.length && <LeaderChart rawData={fallLeadres} leadersOf={'fall'} date={lastTradeDate} />}
        </div>
      </div>
    </div>
  )
}

export default HeadPage
