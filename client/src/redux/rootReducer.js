import { combineReducers } from 'redux'
import MenuReducer from './reducers/menuReducer'
import AuthReducer from './reducers/authReducer'

export default combineReducers({
  menu: MenuReducer, auth: AuthReducer
})