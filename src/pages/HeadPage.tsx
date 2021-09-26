import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { tradesActionCreator } from '../store/reducers/trades/action-creators'

const HeadPage: FC = () => {
  const { lastTradeDate } = useTypedSelector((state) => state.tradesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tradesActionCreator.fetchLastTradeDate())
  }, []) //eslint-disable-line

  console.log('lastTradeDate: ', lastTradeDate)

  return <div>Главная</div>
}

export default HeadPage
