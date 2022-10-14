import { GETUSERDETAILSAPI,GETNOTIFICATIONMESSAGESSAPI } from '../BaseLayout/action';

export default function (state = {}, action) {
  switch (action.type) {
    case GETUSERDETAILSAPI:// start authenticating the user and set loading = true
      return {};
    case GETNOTIFICATIONMESSAGESSAPI:// get Notification Messages 
      return {};
    default:
      return state;
  }
}