import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset';

const REACT_APP_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_PORT_NO = process.env.REACT_APP_API_PORT_NO;
const REST_API_BASE_PATH = process.env.REACT_APP_REST_API_BASE_PATH;
const { hostname, protocol } = window.location;
const REACT_APP_GRAPHQL_API_BASE_PATH = 
  process.env.REACT_APP_GRAPHQL_API_BASE_PATH;
//const API_URL = `${protocol}//${REACT_APP_API_ENDPOINT}:${API_PORT_NO}`;
const API_URL = `${REACT_APP_API_ENDPOINT}:${API_PORT_NO}`;

const generateCorrelationId = () => {
  return generateUUID();
};

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

/**
 * Checking response status. In case of failed response code throw error back
 * @method checkStatus
 * @param {Array / Object} service response
 * @return {Array / Object} response data
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status<300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * Parsing the service response. Do it only if required
 * @method parseJSON
 * @param {Array / Object} service response 
 * @return {Array / Object} Valid JSON
 */
const parseJSON = (response) => response.json();

/**
 * Check if received response has any error.
 * If it has any error in the response throw error back
 */
const checkForError = (data) => {
  if (!Object.prototype.hasOwnProperty.call(data, 'error')) {
    return data;
  }

  const error = new Error(data.error[0].message);
  throw error;
};

/**
 * Function to add mandatory headers before routing the request.
 * correlationId is added in the header so that the request can be tracked across layers. 
 */
const addMandatoryHeaders = (headers) => {
  headers.append('content-type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('correlationId', generateCorrelationId());
};

// Make server call using fetch
const fetchData = (apiURL, httpVerb, headers, requestPayLoad) => {
  const requestHeaders = new Headers();

  // Add the mandatory headers here
  addMandatoryHeaders(requestHeaders);

  // Add the custom headers
  Object.keys(headers).forEach((key) => {
    requestHeaders.append(key, headers[key]);
  });
  console.log('API_URL ='+API_URL);
  console.log('apiURL ='+apiURL);
  console.log('httpVerb ='+httpVerb);
  console.log('requestPayLoad ='+JSON.stringify(requestPayLoad));
  const responseText = fetch(apiURL, {
    method: httpVerb,
    headers:requestHeaders,
    body: JSON.stringify(requestPayLoad)
  })
    .then((response) => checkStatus(response))
    .then((response) => parseJSON(response))
    .then((data) => checkForError(data))
    .then((data) => data)
    // eslint-disable-next-line
    .catch((error) => {
      throw error;
    });

    return responseText;
};


/**
 * Function used by all the actions in container components to make API Call
 * Function to make a synchronous call using Async/await
 */
export const serviceConnector = async (
  apiName,
  httpVerb,
  headers,
  requestPayLoad
) => {
  const apiURL = `${API_URL}${REST_API_BASE_PATH}${apiName}`;
  const data = await fetchData(apiURL, httpVerb, headers, requestPayLoad);
  const jsonResult = await data;
  return jsonResult;
};

/**
 * Function used by all the actions in container components to make GraphQL Call
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}${REACT_APP_GRAPHQL_API_BASE_PATH}`,
    headers: {
      correlationId: generateCorrelationId()
    }
  }),
  cache: new InMemoryCache()
});