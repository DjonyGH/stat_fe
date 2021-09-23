import { TAppDispatch } from '../..'
import {
  EIssuersAction,
  ISetErrorAction,
  ISetIsLoadingAction,
  ISetIssuersAction,
  ISetSelectedIssuerAction,
  TIssuer
} from './types'

export const issuersActionCreator = {
  setIssuers: (issuers: TIssuer[]): ISetIssuersAction => ({ type: EIssuersAction.SET_ISSUERS, payload: issuers }),
  setSelectedIssuer: (issuer: TIssuer): ISetSelectedIssuerAction => ({
    type: EIssuersAction.SET_SELECTED_ISSUER,
    payload: issuer
  }),
  setIsLoading: (isLoading: boolean): ISetIsLoadingAction => ({
    type: EIssuersAction.SET_IS_LOADING,
    payload: isLoading
  }),
  setError: (error: string): ISetErrorAction => ({ type: EIssuersAction.SET_ERROR, payload: error }),
  fetchIssuers: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(issuersActionCreator.setIsLoading(true))

      const response = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities.json')

      const data = await response.json()
      const filteredData = data.securities.data.filter((issuer: any) => issuer[1] === 'TQBR' && issuer[6] !== 'N')

      const issuers = filteredData.map((issuer: any) => ({
        id: issuer[0],
        name: issuer[2]
      }))
      dispatch(issuersActionCreator.setIssuers(issuers))
    } catch (error) {
      dispatch(issuersActionCreator.setError(String(error)))
    }
  }
}
