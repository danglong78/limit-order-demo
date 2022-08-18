export const ellipseAddress = ({ address, lengthStart = 6, lengthEnd = 8 }) => {
  return address
    ? `${address.substring(0, lengthStart)}...${address.substring(
        address.length - lengthEnd
      )}`
    : null;
};
