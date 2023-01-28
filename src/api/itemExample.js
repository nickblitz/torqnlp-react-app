/**
 * Example of an API class.
 */
import { request } from '../lib/http';
import { instanceExample } from '../constants/apiRouting';
import { apiConfig } from '../config';

class ItemExampleApi {
  list(data) {
    return request(
      'GET',
      instanceExample(),
      { data },
      apiConfig.API_VERSIONS.V1
    );
  }
}

export const itemExampleApi = new ItemExampleApi();