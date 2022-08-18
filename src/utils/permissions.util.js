import jwtDecode from 'jwt-decode';
import { PERMISSION } from 'constants/permissions.constant';

export const getUserPermissions = (accessToken) => {
  let decodedToken;
  try {
    decodedToken = jwtDecode(accessToken);
  } catch (error) {
    decodedToken = {};
  }
  return decodedToken.permissions;
};

export const checkPermission = (requiredPermission, userPermissions) => {
  return (
    userPermissions.includes(requiredPermission) ||
    userPermissions.includes(PERMISSION.ALL)
  );
};

export const checkHavingSomeOfPermissions = (
  requiredPermissions,
  userPermissions
) => {
  if (userPermissions.includes(PERMISSION.ALL)) return true;

  return (
    userPermissions.filter((permission) =>
      requiredPermissions.includes(permission)
    ).length !== 0
  );
};
