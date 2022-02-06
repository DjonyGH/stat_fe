import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styles from './portfolioPage.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Row } from 'antd'
import { portfolioActionCreator } from '../../store/reducers/portfolio/action-creators'

const PortfolioPage: FC = () => {
  const { usdPrice, eurPrice } = useTypedSelector((state) => state.portfolioReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(portfolioActionCreator.fetchCurrency())
    dispatch(portfolioActionCreator.fetchMyTrades())
  }, []) //eslint-disable-line

  return (
    <div className={styles.container}>
      <Row className={styles.currency} justify={'start'}>
        <div>USD: {usdPrice}</div>
        <div>EURO: {eurPrice}</div>
      </Row>
      <Row justify={'start'}></Row>
      <Row justify={'space-between'}></Row>
    </div>
  )
}

export default PortfolioPage
