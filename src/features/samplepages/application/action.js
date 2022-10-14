import { serviceConnector } from '../../../services/api';

export const ACTIONBASEDAPI = 'ACTIONBASEDAPI';
export const ONLOADBASEDAPI = 'ONLOADBASEDAPI';

export function actionBasedAPI(formValue1, formValue2) {
  return {
    type: ACTIONBASEDAPI,
    payload: serviceConnector('/app/api2', 'POST',{}, { "formValue1" : formValue1, "formValue2" : formValue2 }),
    actionformvalue1: formValue1,
    actionformvalue2: formValue2
  };
}

export function onLoadBasedAPI() {
    return {
      type: ONLOADBASEDAPI,
      payload: serviceConnector('/app/api1', 'POST',{}, {})
    };
}