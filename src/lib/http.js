import axios from 'axios';
import qs from 'query-string';
import { camelCase, get, mapKeys, snakeCase } from 'lodash';
import Cookies from 'js-cookie';
import { APIError } from './errors';
import recursiveFunc from '../utils/recursiveFunc';
import { AUTHENTICATION_COOKIE_NAME } from '../constants/cookies';
import { apiConfig } from '../config';
import { createAuthHeader } from '../utils/authHeaders';

export const REQUEST_TIMEOUT_MS = 60000;

const camelCaseIfNotId = v => (v.includes('-') ? v : camelCase(v));

const extractResult = (response) => {
  const code = response.status;
  const body = response.data;

  if (code === 200) {
    // convert keys to camelCase and return
    return recursiveFunc(mapKeys)(body, (v, k) => camelCaseIfNotId(k));
  }
  throw new APIError(code, body.error);
};

export const serverUrl = (path, version= null) => {
  const base = apiConfig.API_BASE;
  let url = null;
  if (base) {
    // the url is relative unless a base is configured
    url = `${base}/${path}/`;
  }

  if (version) {
    url = `${base}/${version}/${path}/`;
  }
  return url;
};

export const request = (method, url, options = {}, apiVersion = null) => new Promise((resolve, reject) => {
  if (!url) {
    return reject(new APIError(400, 'Request url is a required field'));
  }
  if (!method) {
    return reject(new APIError(400, 'Request method is a required field'));
  }
  const headers = {
    ...createAuthHeader(Cookies.get(AUTHENTICATION_COOKIE_NAME, {})),
  };
  if (get(options, 'data')) {
    options.data = recursiveFunc(mapKeys)(options.data, (v, k) => snakeCase(k))
  }

  if (get(options, 'params')) {
    options.params = recursiveFunc(mapKeys)(options.params, (v, k) => snakeCase(k))
  }

  const reqOptions = {
    timeout: REQUEST_TIMEOUT_MS,
    url: serverUrl(url, apiVersion),
    paramsSerializer: { serialize: params => qs.stringify(params) },
    headers,
    method,
    ...options,
  };
  return axios.request(reqOptions)
    .then(extractResult)
    .then(resolve)
    .catch((response) => {
      if (get(response, ['response', 'status']) === 401) {
        // hand un authenticated error
      }
      return reject(response);
    });
});