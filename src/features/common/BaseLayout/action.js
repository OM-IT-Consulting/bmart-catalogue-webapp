import { serviceConnector } from '../../../services/api';

export const GETUSERDETAILSAPI = 'GETUSERDETAILSAPI';
export const GETNOTIFICATIONMESSAGESSAPI = 'GETNOTIFICATIONMESSAGESSAPI';

export function getUserDetailsAPI() {
    return {
      type: GETUSERDETAILSAPI,
      payload: serviceConnector('/auth/getUserDetails', 'POST',{}, {})
    };
}

export function getNotificationMessages() {
  return {
    type: GETNOTIFICATIONMESSAGESSAPI,
    payload: serviceConnector('/app/getNotificationMessages', 'POST',{}, {})
  };
}