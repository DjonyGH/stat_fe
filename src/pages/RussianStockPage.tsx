import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { issuersActionCreator } from '../store/reducers/issuers/action-creators'
import { tradesActionCreator } from '../store/reducers/trades/action-creators'
import { TIssuer } from '../store/reducers/issuers/types'
import { Button, AutoComplete } from 'antd'

const { Option } = AutoComplete

const RussianStockPage: FC = () => {
  const { issuers, selectedIssuer } = useTypedSelector((state) => state.issuersReducer)
  const { trades } = useTypedSelector((state) => state.tradesReducer)
  const dispatch = useDispatch()
  console.log('selectedIssuer', selectedIssuer)
  console.log('trades', trades)

  useEffect(() => {
    dispatch(issuersActionCreator.fetchIssuers())
  }, []) //eslint-disable-line

  useEffect(() => {
    if (selectedIssuer) {
      dispatch(tradesActionCreator.fetchTrades(selectedIssuer.id))
    }
  }, [selectedIssuer]) //eslint-disable-line

  const handleClickBtn = () => {
    console.log('Click')
  }

  const selectIssuer = (value: string, option: any) =>
    dispatch(issuersActionCreator.setSelectedIssuer({ id: option.key, name: value }))

  return (
    <div>
      <Button style={{ marginTop: 20 }} type="primary" onClick={handleClickBtn}>
        Primary Button
      </Button>
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
