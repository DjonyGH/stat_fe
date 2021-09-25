import React from 'react'
import HeadPage from '../pages/HeadPage'
import NoFoundPage from '../pages/NoFoundPage'
import RussianStockPage from '../pages/RussianStockPage'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}
export enum ERoutes {
  HEAD = '/',
  RUSSIAN_STOCK = '/russian-stock',
  NO_FOUND = '/no-found',
  USA_STOCK = '/usa-stock'
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
  },
  {
    path: ERoutes.NO_FOUND,
    component: NoFoundPage
  }
]

export const privatRoutes: IRoute[] = []
