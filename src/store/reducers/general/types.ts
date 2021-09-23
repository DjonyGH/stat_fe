export interface IGeneralState {
  isLoading: boolean
  error: string
}

export enum EGeneralAction {
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR'
}

export interface ISetIsLoadingAction {
  type: EGeneralAction.SET_IS_LOADING
  payload: boolean
}

export interface ISetErrorAction {
  type: EGeneralAction.SET_ERROR
  payload: string
}

export type TGeneralAction = ISetIsLoadingAction | ISetErrorAction
