import { EGeneralAction, IGeneralState, TGeneralAction } from './types'

const initialState: IGeneralState = {
  isLoading: false,
  error: ''
}

export default function generalReducer(state = initialState, action: TGeneralAction): IGeneralState {
  switch (action.type) {
    case EGeneralAction.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case EGeneralAction.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}
