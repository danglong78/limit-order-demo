import React from 'react';


import QuiteTown from 'images/quite_town.svg';
import SinglePageButton from 'components/SinglePageButton.component';

const PageNotFound = () => {

  return (
    <SinglePageButton
      title='youAreOffline'
      imgSrc={QuiteTown}
      description='goBackOnline'
      btnHref="/"
      btnClass="w-32"
      btnTitle='Go back'
    />
  );
};

export default PageNotFound;
