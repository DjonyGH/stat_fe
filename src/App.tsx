import React, { FC } from 'react'
import './App.css'

import { Layout, Menu, Row } from 'antd'
const { Header, Content, Footer } = Layout

const App: FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <Row justify={'space-between'}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
            <Menu.Item key="0">Главная</Menu.Item>
            <Menu.Item key="1">Акции РФ</Menu.Item>
            <Menu.Item key="2" disabled>
              Акции США
            </Menu.Item>
          </Menu>
          <div className="login" />
        </Row>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center', height: '70px' }}>Created by Kalimullin Evgeniy @2021</Footer>
    </Layout>
  )
}

export default App
