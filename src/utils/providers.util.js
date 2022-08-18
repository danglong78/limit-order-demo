import { StaticJsonRpcProvider } from '@ethersproject/providers';

const RPC_URL = process.env.NEXT_PUBLIC_NODE_1;

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);

export default null;
