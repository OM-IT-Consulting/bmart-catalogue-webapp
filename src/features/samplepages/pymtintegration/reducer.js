import { PLACEORDER } from '../pymtintegration/action';

const initialState = { values:{amount: '', currency: '' } };


export default function (state = {}, action) {
  switch (action.type) {
    case PLACEORDER:// start authenticating the user and set loading = true
      console.log('pymtintegration reducer called');
      return { values:{amount: action.actionamount, currency: action.actioncurrency } };
    default:
      return state;
  }
}