import { REGISTERUSER } from '../../userlogin/SignUp/action';

export default function (state = { items: [] }, action) {
  switch (action.type) {
    case REGISTERUSER:// start authenticating the user and set loading = true
      console.log('signup reducer called');
      return { items: [...state.items, action.payload] };
    default:
      return state;
  }
}