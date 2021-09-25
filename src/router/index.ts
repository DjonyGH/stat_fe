import React from 'react'
import HeadPage from '../pages/HeadPage'
import RussianStockPage from '../pages/RussianStockPage'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}
export enum ERoutes {
  HEAD = '/',
  RUSSIAN_STOCK = '/russian-stock'
}

export const publicRoutes: IRoute[] = [
  {
    path: ERoutes.HEAD,
    component: HeadPage,
    exact: true
  },
  {
    path: ERoutes.RUSSIAN_STOCK,
    component: RussianStockPage,
    exact: true
  }
]

export const privatRoutes: IRoute[] = []
