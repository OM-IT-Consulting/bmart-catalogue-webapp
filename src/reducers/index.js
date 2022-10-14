import { combineReducers } from 'redux';
import SigninReducers from '../features/userlogin/SignIn/reducer';
import SignupReducers from '../features/userlogin/SignUp/reducer';
import BaseLayoutReducers from '../features/common/BaseLayout/reducer';

const rootReducer = combineReducers({
  signin: SigninReducers,
  signup: SignupReducers,
  baselayout:BaseLayoutReducers
});

export default rootReducer;
