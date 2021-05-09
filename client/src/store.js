import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const intialState = {}
const middleWare = [thunk]
const store = createStore(rootReducer,intialState,composeWithDevTools(applyMiddleware(...middleWare)))
export default store