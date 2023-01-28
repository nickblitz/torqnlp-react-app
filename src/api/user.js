import { request } from '../lib/http';
import { me } from '../constants/apiRouting';

class UserApi {
  me(options= {}) {
    return request('GET', me(), options);
  }
}

export const userApi = new UserApi();