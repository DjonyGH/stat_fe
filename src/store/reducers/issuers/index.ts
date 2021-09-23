import { EIssuersAction, IIssuersState, TIssuersAction } from './types'

const initialState: IIssuersState = {
  issuers: [],
  selectedIssuer: undefined,
  isLoading: false,
  error: ''
}

export default function issuersReducer(state = initialState, action: TIssuersAction): IIssuersState {
  switch (action.type) {
    case EIssuersAction.SET_ISSUERS:
      return { ...state, issuers: action.payload, isLoading: false }
    case EIssuersAction.SET_SELECTED_ISSUER:
      return { ...state, selectedIssuer: action.payload }
    case EIssuersAction.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case EIssuersAction.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}
