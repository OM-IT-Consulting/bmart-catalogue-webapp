import { ACTIONBASEDAPI } from '../application/action';
import { ONLOADBASEDAPI } from '../application/action';

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIONBASEDAPI:// start authenticating the user and set loading = true
      console.log('actionbased reducer called');
      return { values:{stateformvalue1: action.actionformvalue1, stateformvalue2: action.actionformvalue2 } };
      case ONLOADBASEDAPI:// start authenticating the user and set loading = true
      console.log('onloadbased reducer called');
      return {};
    default:
      return state;
  }
}