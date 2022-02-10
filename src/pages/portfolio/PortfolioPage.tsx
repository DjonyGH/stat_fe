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
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    dispatch(portfolioActionCreator.fetchCurrency())
    dispatch(portfolioActionCreator.fetchFXUS())
    dispatch(portfolioActionCreator.fetchFXGD())
    dispatch(portfolioActionCreator.fetchFXRU())
    dispatch(portfolioActionCreator.fetchMyTrades())
  }, []) //eslint-disable-line

  const cash = 552 + 2521

  const ETFsPrices = {
    FXUS: fxusPrice || '',
    FXGD: fxgdPrice || '',
    FXRU: fxruPrice || ''
  }

  const target = {
    FXUS: 65,
    FXGD: 15,
    FXRU: 20
  }

  useEffect(() => {
    if (myAssets.length && fxusPrice && fxgdPrice && fxruPrice) {
      let data = myAssets.map((asset) => ({
        ...asset,
        key: asset.ticker,
        averagePrice: +asset.averagePrice.toFixed(2),
        myTotal: `${asset.averagePrice * asset.count}`,
        currentPrice: ETFsPrices[asset.ticker],
        currentTotal: `${(+ETFsPrices[asset.ticker] * asset.count).toFixed(0)}`,
        profit: `${((+ETFsPrices[asset.ticker] - +asset.averagePrice) * asset.count).toFixed(0)}`
      }))

      const total: number =
        data.reduce((acc: number, item: IMyAsset) => {
          return (acc = acc + +item.currentTotal!)
        }, 0) + cash

      data = data.map((asset) => ({
        ...asset,
        allocation: `${(((+ETFsPrices[asset.ticker] * asset.count) / total) * 100).toFixed(1)}`,
        target: `${target[asset.ticker]}`,
        deviation: `${(((+ETFsPrices[asset.ticker] * asset.count) / total) * 100 - target[asset.ticker]).toFixed(1)}`
      }))

      data = data.sort((a, b) => +a.deviation! - +b.deviation!)
      data[0].action = 'BUY'
      data[1].action = +data[1].deviation! > 0 ? 'sell' : 'buy'
      data[2].action = 'SELL'
      data = data.sort((a, b) => +b.target! - +a.target!)

      setDataSource(data)
      setTotal(total)
    }
  }, [myAssets, fxusPrice, fxgdPrice, fxruPrice]) //eslint-disable-line

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
      title: 'Profit, RUB',
      dataIndex: 'profit',
      key: 'profit',
      render: (value: string) => {
        return <div className={`${+value > 0 ? styles.green : styles.red}`}>{value}</div>
      }
    },
    {
      title: 'Allocation, %',
      dataIndex: 'allocation',
      key: 'allocation'
    },
    {
      title: 'Target, %',
      dataIndex: 'target',
      key: 'target'
    },
    {
      title: 'Deviation, %',
      dataIndex: 'deviation',
      key: 'deviation'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value: string) => {
        return <div className={`${value.toLowerCase() === 'buy' ? styles.green : styles.red}`}>{value}</div>
      }
    }
  ]

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
