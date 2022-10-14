import { SENDOTPEMAIL,VERIFYOTP } from '../../userlogin/ForgotPassword/action';

export default function (state = {}, action) {
  switch (action.type) {
    case SENDOTPEMAIL:// start authenticating the user and set loading = true
      console.log('forgot password reducer called');
      return { values:{emailid: action.actionemailid } };
    case VERIFYOTP:// start authenticating the user and set loading = true
       console.log('forgot password reducer called');
      return { values:{emailid: action.actionemailid, otp: action.actionotp } };
    default:
      return state;
  }
}