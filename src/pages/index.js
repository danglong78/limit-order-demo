import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UsdtToken } from 'constants/SmartContractAddress.constants';
import RealnextateTradingSection from 'components/RealnextateTradingSection.component';
import BackgroundGlassmorphism from 'components/BackgroundGlassmorphism.component';
import Head from 'next/head';

const IDOPage = () => {
  return (
    <>
      <Head>
        <title>IDO</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px-62px)] md:h-[calc(100vh-74px)] w-full">
        <BackgroundGlassmorphism className="!h-[calc(100%-64px-62px)] !p-0 !top-[62px] md:!top-[74px]" />
        <div className="w-[calc(100%-48px)] md:w-[450px] m-6 z-10">
          <RealnextateTradingSection
            currencyToken={{
              name: 'USDT',
              address: UsdtToken,
            }}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;
  // Pass data to the page via props
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'detail'])),
    },
  };
}

export default IDOPage;
