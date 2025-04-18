import React from 'react'
import BackButton from '../../../common/BackButton';

const Header = ({ move }) => {
  return (
    <header className="container">
      <div className="col-12 d-flex justify-content-between align-items-center mt-2 flex-wrap">
        <BackButton />
        <h1 className="text-capitalize">{move.name.replace("-", " ")}</h1>
        <div />
      </div>
    </header>
  );
};

export default Header
