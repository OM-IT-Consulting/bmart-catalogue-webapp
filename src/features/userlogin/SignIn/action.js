import { serviceConnector } from '../../../services/api';

export const AUTHENTICATEUSER = 'AUTHENTICATEUSER';

export function authenticateUser(username, userpassword) {
  return {
    type: AUTHENTICATEUSER,
    payload: serviceConnector('/auth/signin', 'POST',{}, { "username" : username, "password" : userpassword }),
    actionusername: username,
    actionuserpassword: userpassword
  };
}