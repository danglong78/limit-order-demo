import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
import { refreshTokens } from 'services/auth.service';
import { initializeStore } from 'states/store';
import { refreshToken, logout } from 'states/user/user.action';
import withCatch from 'utils/withCatch.util';

// change this to auth service get renew token
/**
 * Obtains a new token if the current token has expired, used before actually sending the request to prevent useless API calls
 * @param {string} accessToken
 * @return {Promise<string>}
 */

const validateTokenExpirationDate = async (accessToken = '') => {
  let decodedToken;
  const now = +dayjs();

  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    decodedToken = {};
  }

  // decodedToken.exp is in seconds, new Date() is in milliseconds
  if (decodedToken.exp * 1000 < now || !accessToken) {
    // authService.refreshToken;
    const { dispatch } = initializeStore();
    const [data, error] = await withCatch(refreshTokens());

    if (error) {
      dispatch(logout());
      return '';
    }

    dispatch(refreshToken(data));
    return data.accessToken;
  }

  return accessToken;
};

export default validateTokenExpirationDate;
