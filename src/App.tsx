import { Button } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { useTypedSelector } from './hooks/useTypedSelector'
import { issuersActionCreator } from './store/reducers/issuers/action-creators'
import { AutoComplete } from 'antd'
import { TIssuer } from './store/reducers/issuers/types'

const { Option } = AutoComplete

const App: FC = () => {
  const {
    issuers,
    selectedIssuer
    // isLoading,
    // error
  } = useTypedSelector((state) => state.issuersReducer)
  const dispatch = useDispatch()
  console.log('selectedIssuer', selectedIssuer)

  useEffect(() => {
    console.log('useEffect')
    dispatch(issuersActionCreator.fetchIssuers())
  }, [])

  const handleClickBtn = () => {
    console.log('Click')
  }

  const selectIssuer = (value: string, option: any) =>
    dispatch(issuersActionCreator.setSelectedIssuer({ id: option.key, name: value }))

  return (
    <div className="App">
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

export default App
