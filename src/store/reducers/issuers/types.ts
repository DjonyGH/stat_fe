export type TIssuer = {
  id: string
  name: string
}

export interface IIssuersState {
  issuers: TIssuer[]
  selectedIssuer?: TIssuer
  isLoading: boolean
  error: string
}

export enum EIssuersAction {
  SET_ISSUERS = 'SET_ISSUERS',
  SET_SELECTED_ISSUER = 'SET_SELECTED_ISSUER',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR'
}

export interface ISetIssuersAction {
  type: EIssuersAction.SET_ISSUERS
  payload: TIssuer[]
}

export interface ISetSelectedIssuerAction {
  type: EIssuersAction.SET_SELECTED_ISSUER
  payload: TIssuer
}

export interface ISetIsLoadingAction {
  type: EIssuersAction.SET_IS_LOADING
  payload: boolean
}

export interface ISetErrorAction {
  type: EIssuersAction.SET_ERROR
  payload: string
}

export type TIssuersAction = ISetIssuersAction | ISetSelectedIssuerAction | ISetIsLoadingAction | ISetErrorAction
