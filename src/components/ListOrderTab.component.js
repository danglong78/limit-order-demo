import React, { useMemo } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { toast } from 'react-hot-toast';
import { getSigner, getContract } from 'utils/contract.util';
import { getListOrders, cancelOrder } from 'utils/limitOrder.util';
import withCatch from 'utils/withCatch.util';
import Newspaper from 'images/newspaper.svg';
import ERC20 from 'abis/ERC20.json';
import useAsyncWithLoading from 'hooks/useAsyncWithLoading';

import Loading from 'components/Loading.component';
import NotFoundAlert from './NotFoundAlert.component';
import { ButtonFourth } from './Button';

const ListOrderTab = ({ handler }) => {
  const { account, library } = useWeb3React();
  const signer = useMemo(() => {
    return getSigner(library, account);
  }, [account]);
  const { data } = useSWR(
    {
      userAddress: account,
      signer,
      handler,
    },
    async (params) => {
      if (!params) return [];
      const [orders, error] = await withCatch(getListOrders(params));
      if (orders) {
        const listPromise = orders.map(async (order) => {
          const inputContract = getContract(order.inputToken, ERC20, library);
          const inputName = await inputContract.symbol();
          const outputContract = getContract(order.outputToken, ERC20, library);
          const outputName = await outputContract.symbol();
          return { ...order, inputName, outputName };
        });
        const result = await Promise.all(listPromise);
        return result;
      }
      if (error) {
        return [];
      }
      return [];
    },
    { refreshInterval: 10000 }
  );
  const { excAsyncFunc: excTrade, loading } = useAsyncWithLoading({
    asyncFunc: async (id) => {
      const signer = getSigner(library, account);
      const [tx, placeError] = await withCatch(
        cancelOrder(id, account, signer, handler)
      );
      if (placeError) {
        toast.error(placeError.message);
        return;
      }
      const [, txError] = await withCatch(tx.wait());
      if (txError) {
        toast.error(txError.message);
      }
    },
  });
  return (
    <div className="listing-section__wrap mt-10">
      <div>
        <h2 className="text-heading1">List orders</h2>
      </div>
      <div className="w-40 divider" />
      {!data ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        data && (
          <>
            {data?.map((item, index) => (
              <div
                className="bg-white p-3 border-2 border-primary-100 rounded-xl"
                key={index}
              >
                <div className="flex justify-between items-center ">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xl">{item.inputName}</span>
                    <ArrowSmRightIcon className="w-6 h-6" />
                    <span className="font-bold text-xl">{item.outputName}</span>
                  </div>{' '}
                  <ButtonFourth
                    onClick={() => excTrade(item.id)}
                    loading={loading}
                  >
                    Cancel button
                  </ButtonFourth>
                </div>
                <p>Input amount: {item.inputAmount}</p>
                <p>Min return: {item.minReturn}</p>
                <p>Status: {item.status}</p>
              </div>
            ))}
            {data?.length === 0 && (
              <NotFoundAlert src={Newspaper} title="Not found any order" />
            )}
          </>
        )
      )}
    </div>
  );
};

export default ListOrderTab;
