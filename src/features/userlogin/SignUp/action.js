import { serviceConnector } from '../../../services/api';

export const REGISTERUSER = 'REGISTERUSER';

export function registerUser(username,newpassword,confirmnewpassword,emailid,firstname,lastname) {
  return {
    type: REGISTERUSER,
    payload: serviceConnector('/preauth/signup', 'POST',{}, { "firstName" : firstname, "lastName" : lastname,"userName" : username, "emailId" : emailid, "newPassword" : newpassword,"confirmNewPassword": confirmnewpassword })
  };
}