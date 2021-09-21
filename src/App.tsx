import { Button } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { useTypedSelector } from './hooks/useTypedSelector'
import { issuersActionCreator } from './store/reducers/issuers/action-creators'

const App: FC = () => {
  const {
    issuers
    // isLoading,
    // error
  } = useTypedSelector((state) => state.issuersReducer)
  const dispatch = useDispatch()
  console.log('issuers', issuers)

  const fetchIssuers = () => {
    console.log('fetchIssuers')
    dispatch(issuersActionCreator.fetchIssuers())
  }
  return (
    <div className="App">
      <Button type="primary" onClick={fetchIssuers}>
        Primary Button
      </Button>
    </div>
  )
}

export default App
