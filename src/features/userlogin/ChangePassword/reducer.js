import { CHANGEPASSWORD } from '../../userlogin/ChangePassword/action';


export default function (state = {}, action) {
  switch (action.type) {
    case CHANGEPASSWORD:// start authenticating the user and set loading = true
      console.log('changepassword reducer called');
      return { values:{username: action.actionusername, userpassword: action.actionuserpassword,newpassword: action.actionnewpassword,confirmnewpassword:action.actionnewpassword } };
    default:
      return state;
  }
}