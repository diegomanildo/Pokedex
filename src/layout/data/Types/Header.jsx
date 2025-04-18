import React from "react";
import TypeIcon from "../../../common/TypeIcon";
import BackButton from "../../../common/BackButton";
import { getTypeColor } from "../../../utils/colors";

const Header = ({ name }) => {
  return (
    <header className="container">
      <div className="col-12 d-flex justify-content-between align-items-center mt-2 flex-wrap">
        <BackButton />
        <h1 className="text-capitalize" style={{ color: getTypeColor(name) }}>{name}</h1>
        <TypeIcon name={name} />
      </div>
    </header>
  );
};

export default Header;
