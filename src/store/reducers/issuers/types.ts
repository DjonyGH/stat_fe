export type TIssuer = {
  id: string
  name: string
}

export interface IIssuersState {
  issuers: TIssuer[]
  selectedIssuer?: TIssuer
}

export enum EIssuersAction {
  SET_ISSUERS = 'SET_ISSUERS',
  SET_SELECTED_ISSUER = 'SET_SELECTED_ISSUER'
}

export interface ISetIssuersAction {
  type: EIssuersAction.SET_ISSUERS
  payload: TIssuer[]
}

export interface ISetSelectedIssuerAction {
  type: EIssuersAction.SET_SELECTED_ISSUER
  payload: TIssuer
}

export type TIssuersAction = ISetIssuersAction | ISetSelectedIssuerAction
