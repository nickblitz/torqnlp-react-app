import Cookies from 'js-cookie';
import { toNumber } from 'lodash';
import { SELECTED_ACCOUNT_COOKIE_NAME } from '../constants/cookies';

export const withAccount = data => ({
  accountId: toNumber(Cookies.get(SELECTED_ACCOUNT_COOKIE_NAME)),
  ...data,
});