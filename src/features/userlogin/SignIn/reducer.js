import { AUTHENTICATEUSER } from '../../userlogin/SignIn/action';

const initialState = { values:{username: 'test1', userpassword: 'test1' } };


export default function (state = {}, action) {
  switch (action.type) {
    case AUTHENTICATEUSER:// start authenticating the user and set loading = true
      console.log('signin reducer called');
      return { values:{username: action.actionusername, userpassword: action.actionuserpassword } };
    default:
      return state;
  }
}