import { TIssuer, TIssuersAction } from './types'

const initialState: TIssuer[] = []

export default function issuersReducer(state = initialState, action: TIssuersAction): TIssuer[] {
  switch (action.type) {
    default:
      return state
  }
}
