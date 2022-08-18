import React from 'react';
import Error from 'images/404.svg';

import SinglePageButton from 'components/SinglePageButton.component';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PageNotFound = () => {
  const { t } = useTranslation(['404', 'common']);

  return (
    <SinglePageButton
      title={t('pageNotFound')}
      imgSrc={Error}
      description={t('oops')}
      btnHref="/"
      btnClass="w-32"
      btnTitle={t('common:goBack')}
    />
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', '404'])),
    },
  };
}

export default PageNotFound;
