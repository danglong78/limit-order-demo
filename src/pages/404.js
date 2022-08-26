import React from 'react';
import Error from 'images/404.svg';

import SinglePageButton from 'components/SinglePageButton.component';

const PageNotFound = () => {

  return (
    <SinglePageButton
      title={"Page not found"}
      imgSrc={Error}
      description={''}
      btnHref="/"
      btnClass="w-32"
      btnTitle={"Go back"}
    />
  );
};


export default PageNotFound;
