import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './portfolioPage.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Row, Table } from 'antd'
import { portfolioActionCreator } from '../../store/reducers/portfolio/action-creators'
import { IMyAsset } from '../../store/reducers/portfolio/types'

const PortfolioPage: FC = () => {
  const { usdPrice, eurPrice, fxusPrice, fxgdPrice, fxruPrice, myAssets } = useTypedSelector(
    (state) => state.portfolioReducer
  )
  const dispatch = useDispatch()
  const [dataSource, setDataSource] = useState<IMyAsset[]>([])

  useEffect(() => {
    dispatch(portfolioActionCreator.fetchCurrency())
    dispatch(portfolioActionCreator.fetchFXUS())
    dispatch(portfolioActionCreator.fetchFXGD())
    dispatch(portfolioActionCreator.fetchFXRU())
    dispatch(portfolioActionCreator.fetchMyTrades())
  }, []) //eslint-disable-line

  const ETFsPrices = {
    FXUS: fxusPrice || '',
    FXGD: fxgdPrice || '',
    FXRU: fxruPrice || ''
  }

  useEffect(() => {
    const dataSource = myAssets.map((asset) => ({
      ...asset,
      key: asset.ticker,
      averagePrice: +asset.averagePrice.toFixed(2),
      myTotal: `${asset.averagePrice * asset.count}`,
      currentPrice: ETFsPrices[asset.ticker],
      currentTotal: `${(+ETFsPrices[asset.ticker] * asset.count).toFixed(0)}`,
      allocation: `${(((+ETFsPrices[asset.ticker] * asset.count) / total) * 100).toFixed(1)}`
    }))
    setDataSource(dataSource)
  }, [myAssets]) //eslint-disable-line

  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Average Price, RUB',
      dataIndex: 'averagePrice',
      key: 'averagePrice'
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: 'My Total, RUB',
      dataIndex: 'myTotal',
      key: 'myTotal'
    },
    {
      title: 'Current Price, RUB',
      dataIndex: 'currentPrice',
      key: 'currentPrice'
    },
    {
      title: 'Current Total, RUB',
      dataIndex: 'currentTotal',
      key: 'currentTotal'
    },
    {
      title: 'Allocation, %',
      dataIndex: 'allocation',
      key: 'allocation'
    }
  ]

  const cash = 552 + 2521
  const total =
    dataSource.reduce((acc: number, item: IMyAsset) => {
      return (acc = acc + +item.currentTotal!)
    }, 0) + cash

  // console.log('fxusPrice', fxusPrice)

  return (
    <div className={styles.container}>
      <Row className={styles.currency} justify={'start'}>
        <div>USD: {usdPrice}</div>
        <div>EURO: {eurPrice}</div>
      </Row>
      <Row justify={'start'}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Row>
      <Row className={styles.info} justify={'start'}>
        <div>
          Cash: {cash} ({((cash / total) * 100).toFixed(1)}%)
        </div>
        <div>TOTAL: {total.toLocaleString()} RUB</div>
      </Row>
    </div>
  )
}

export default PortfolioPage
