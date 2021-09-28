import React from 'react'
import HeadPage from '../pages/headPage/HeadPage'
import NoFoundPage from '../pages/notFoundPage/NotFoundPage'
import RussianStockPage from '../pages/russianStockPage/RussianStockPage'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}
export enum ERoutes {
  HEAD = '/',
  RUSSIAN_STOCK = '/russian-stock',
  NOT_FOUND = '/not-found',
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
    path: ERoutes.NOT_FOUND,
    component: NoFoundPage
  }
]

export const privatRoutes: IRoute[] = []
