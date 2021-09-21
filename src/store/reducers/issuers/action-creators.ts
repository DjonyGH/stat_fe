import { TAppDispatch } from '../..'
import { EIssuersAction, ISetErrorAction, ISetIsLoadingAction, ISetIssuersAction, TIssuer } from './types'

export const issuersActionCreator = {
  setIssuers: (issuers: TIssuer[]): ISetIssuersAction => ({ type: EIssuersAction.SET_ISSUERS, payload: issuers }),
  setIsLoading: (isLoading: boolean): ISetIsLoadingAction => ({
    type: EIssuersAction.SET_IS_LOADING,
    payload: isLoading
  }),
  setError: (error: string): ISetErrorAction => ({ type: EIssuersAction.SET_ERROR, payload: error }),
  fetchIssuers: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(issuersActionCreator.setIsLoading(true))

      const response = await fetch('http://iss.moex.com/iss/securities.json')
      const data = await response.json()
      //@ts-ignore
      const issuers = data.securities.data.map((issuer) => ({
        id: issuer[1],
        name: issuer[2]
      }))
      dispatch(issuersActionCreator.setIssuers(issuers))
    } catch (error) {
      dispatch(issuersActionCreator.setError(String(error)))
    }
  }
}
