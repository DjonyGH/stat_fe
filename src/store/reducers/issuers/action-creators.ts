import { TAppDispatch } from '../..'
import { generalActionCreator } from '../general/action-creators'
import { EIssuersAction, ISetIssuersAction, ISetSelectedIssuerAction, TIssuer } from './types'

export const issuersActionCreator = {
  setIssuers: (issuers: TIssuer[]): ISetIssuersAction => ({ type: EIssuersAction.SET_ISSUERS, payload: issuers }),
  setSelectedIssuer: (issuer: TIssuer): ISetSelectedIssuerAction => ({
    type: EIssuersAction.SET_SELECTED_ISSUER,
    payload: issuer
  }),
  fetchIssuers: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))

      const response = await fetch('https://iss.moex.com/iss/engines/stock/markets/shares/securities.json')

      const data = await response.json()
      const filteredData = data.securities.data.filter((issuer: any) => issuer[1] === 'TQBR' && issuer[6] !== 'N')

      const issuers: TIssuer[] = filteredData.map((issuer: any) => ({
        id: issuer[0],
        name: issuer[2]
      }))
      dispatch(issuersActionCreator.setIssuers(issuers))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  }
}
