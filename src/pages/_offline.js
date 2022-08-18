import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import QuiteTown from 'images/quite_town.svg';
import SinglePageButton from 'components/SinglePageButton.component';

const PageNotFound = () => {
  const { t } = useTranslation(['offline', 'common']);

  return (
    <SinglePageButton
      title={t('youAreOffline')}
      imgSrc={QuiteTown}
      description={t('goBackOnline')}
      btnHref="/"
      btnClass="w-32"
      btnTitle={t('common:goBack')}
    />
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'offline'])),
    },
  };
}

export default PageNotFound;
