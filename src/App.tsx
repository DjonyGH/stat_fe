import React, { FC, useState } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import './App.css'
import { useTypedSelector } from './hooks/useTypedSelector'

import { Button, Layout, Menu, Row, Spin } from 'antd'
import { ERoutes, publicRoutes } from './router'
const { Header, Content, Footer } = Layout

const App: FC = () => {
  const { isLoading } = useTypedSelector((state) => state.generalReducer)
  const router = useHistory()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([router.location.pathname])

  const handleClickMenuItem = (e: any) => {
    setSelectedKeys(e.keyPath)
    router.push(e.key)
  }

  return (
    <Layout className="layout">
      <Header>
        <Row justify={'space-between'} align={'middle'}>
          <div className="logo">Logo</div>
          <Menu theme="dark" mode="horizontal" selectedKeys={selectedKeys}>
            <Menu.Item key={ERoutes.HEAD} onClick={handleClickMenuItem}>
              Главная
            </Menu.Item>
            <Menu.Item key={ERoutes.RUSSIAN_STOCK} onClick={handleClickMenuItem}>
              Акции РФ
            </Menu.Item>
            <Menu.Item key={ERoutes.USA_STOCK} onClick={handleClickMenuItem} disabled>
              Акции США
            </Menu.Item>
            <Menu.Item key={ERoutes.PORTFOLIO} onClick={handleClickMenuItem}>
              Портфель
            </Menu.Item>
          </Menu>
          <div className="login">
            <Button type="primary">Войти</Button>
          </div>
        </Row>
      </Header>
      <Content>
        <Spin spinning={isLoading}>
          <div className="content">
            <Switch>
              {publicRoutes.map((route) => (
                <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
              ))}
              <Redirect to={ERoutes.NOT_FOUND} />
            </Switch>
          </div>
        </Spin>
      </Content>
      <Footer style={{ textAlign: 'center', height: '70px', background: 'lightgray' }}>
        Created by Kalimullin Evgeniy @2021
      </Footer>
    </Layout>
  )
}

export default App
