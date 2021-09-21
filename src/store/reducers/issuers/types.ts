export type TIssuer = {
  id: string
  name: string
}

export enum EIssuersAction {
  SET_ISSUERS = 'SET_ISSUERS'
}

export type TSetIssuersAction = {
  type: EIssuersAction.SET_ISSUERS
  payload: boolean
}

export type TIssuersAction = TSetIssuersAction
