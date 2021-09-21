import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const rootReducer = combineReducers(reducers)

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
