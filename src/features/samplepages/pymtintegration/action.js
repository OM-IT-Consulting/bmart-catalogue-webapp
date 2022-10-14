import { serviceConnector } from '../../../services/api';

export const PLACEORDER = 'PLACEORDER';

export function placeOrder(amount, currency) {
  return {
    type: PLACEORDER,
    payload: serviceConnector('/app/placeorder', 'POST',{}, { "amount" : amount, "currency" : currency }),
    actionamount: amount,
    actioncurrency: currency
  };
}