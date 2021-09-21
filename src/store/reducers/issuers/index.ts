import { EIssuersAction, IIssuersState, TIssuersAction } from './types'

const initialState: IIssuersState = {
  issuers: [],
  isLoading: false,
  error: ''
}

export default function issuersReducer(state = initialState, action: TIssuersAction): IIssuersState {
  switch (action.type) {
    case EIssuersAction.SET_ISSUERS:
      return { ...state, issuers: action.payload, isLoading: false }
    case EIssuersAction.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case EIssuersAction.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}
