import { serviceConnector } from '../../../services/api';

export const CHANGEPASSWORD = 'CHANGEPASSWORD';

export function changePassword(username, userpassword,newpassword,confirmnewpassword) {
  return {
    type: CHANGEPASSWORD,
    payload: serviceConnector('/preauth/changepassword', 'POST',{}, { "userName" : username, "password" : userpassword,"newPassword":newpassword,"confirmNewPassword":confirmnewpassword }),
    actionusername: username,
    actionuserpassword: userpassword,
    actionnewpassword: newpassword,
    actionconfirmnewpassword: confirmnewpassword
  };
}