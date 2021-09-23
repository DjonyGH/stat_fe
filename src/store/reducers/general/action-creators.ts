import { EGeneralAction, ISetErrorAction, ISetIsLoadingAction } from './types'

export const generalActionCreator = {
  setIsLoading: (isLoading: boolean): ISetIsLoadingAction => ({
    type: EGeneralAction.SET_IS_LOADING,
    payload: isLoading
  }),
  setError: (error: string): ISetErrorAction => ({ type: EGeneralAction.SET_ERROR, payload: error })
}
