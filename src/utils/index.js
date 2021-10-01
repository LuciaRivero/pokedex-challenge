import {URI_POKEAPI} from './constants'

function getDefaultOptions() {
    return {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    };
  }

  const doRequest = async (uri, options) => {
    const defaultOptions = getDefaultOptions();
    const requestOptions = {
      ...defaultOptions,
      ...options
    }
    requestOptions.uri = `${URI_POKEAPI}${uri}`;

    return fetch(requestOptions.uri, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body
      }).then(async response => {
        if (!response.ok) {
            throw new Error("Not response")

        } else {
            return response.json()
        }
      })

  
  }

export const apiPromise = (uri, options) => doRequest(uri, options)

export const apiRequest = (
    uri,
    options = {},
    successCallback,
    failCallback
  ) => doRequest(uri, options).then(successCallback).catch(failCallback)
  

