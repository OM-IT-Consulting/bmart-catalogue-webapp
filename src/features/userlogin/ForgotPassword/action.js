import { serviceConnector } from '../../../services/api';

export const SENDOTPEMAIL = 'SENDOTPEMAIL';

export function sendOTPEmail(emailid,username) {
  return {
    type: SENDOTPEMAIL,
    payload: serviceConnector('/preauth/sendotpemail', 'POST',{}, { "emailId" : emailid ,"userName": username}),
    actionemailid: emailid,
    actionusername: username
  };
}
