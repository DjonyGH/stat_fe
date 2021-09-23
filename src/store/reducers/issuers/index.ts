import { EIssuersAction, IIssuersState, TIssuersAction } from './types'

const initialState: IIssuersState = {
  issuers: [],
  selectedIssuer: undefined
}

export default function issuersReducer(state = initialState, action: TIssuersAction): IIssuersState {
  switch (action.type) {
    case EIssuersAction.SET_ISSUERS:
      return { ...state, issuers: action.payload }
    case EIssuersAction.SET_SELECTED_ISSUER:
      return { ...state, selectedIssuer: action.payload }
    default:
      return state
  }
}
