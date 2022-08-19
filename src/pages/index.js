import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import LimitOrderSection from 'components/LimitOrderSection.component';
import BackgroundGlassmorphism from 'components/BackgroundGlassmorphism.component';
import ListOrderTab from 'components/ListOrderTab.component';
import Head from 'next/head';

const IDOPage = () => {
  const [handler, setHandler] = useState('');
  const { account } = useWeb3React();
  return (
    <>
      <Head>
        <title>IDO</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full">
        <BackgroundGlassmorphism className="!h-[calc(100%-64px-62px)] !p-0 !top-[62px] md:!top-[74px]" />
        <div className="w-[calc(100%-48px)] md:w-[450px] m-6 z-10">
          <LimitOrderSection handler={handler} setHandler={setHandler} />
          {account && handler && <ListOrderTab handler={handler} />}
        </div>
      </div>
    </>
  );
};

export default IDOPage;
