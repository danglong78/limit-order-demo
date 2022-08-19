import { GelatoLimitOrders } from '@gelatonetwork/limit-orders-lib';

const availableHandler = [
  'spookyswap',
  'uniswap',
  'quickswap',
  'spiritswap',
  'bombswap',
  'polydex',
  'cafeswap',
  'pancakeswap',
  'traderjoe',
  'defyswap',
  'pangolin',
];

async function placeLimitOrder(
  tokenInput,
  tokenOutput,
  inputAmount,
  outputAmount,
  signer,
  handler
) {
  if (!availableHandler.includes(handler)) {
    throw new Error('INVALID_HANDLER');
  }
  const gelatoLimitOrders = new GelatoLimitOrders(56, signer, handler);
  const approveTx = await gelatoLimitOrders.approveTokenAmount(
    tokenInput,
    inputAmount
  );
  await approveTx.wait();
  const tx = await gelatoLimitOrders.submitLimitOrder(
    tokenInput,
    tokenOutput,
    inputAmount,
    outputAmount
  );
  return tx;
}

async function cancelOrder(orderId, userAddress, signer, handler) {
  if (!availableHandler.includes(handler)) {
    throw new Error('INVALID_HANDLER');
  }
  const orders = await getListOrders(userAddress, signer, handler);
  const canceledOrder = orders.filter((order) => order.id === orderId);
  if (canceledOrder.length == 0) {
    throw new Error('INVALID_ORDER_ID');
  }
  const gelatoLimitOrders = new GelatoLimitOrders(56, signer, handler);
  const tx = await gelatoLimitOrders.cancelLimitOrder(canceledOrder[0], true);
  return tx;
}

async function getListOrders({ userAddress, signer, handler }) {
  if (!availableHandler.includes(handler)) {
    throw new Error('INVALID_HANDLER');
  }
  const gelatoLimitOrders = new GelatoLimitOrders(56, signer, handler);
  return gelatoLimitOrders.getOrders(userAddress);
}

export { getListOrders, cancelOrder, placeLimitOrder };
