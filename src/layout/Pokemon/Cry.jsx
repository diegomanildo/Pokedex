import { IconPlayerPlayFilled } from "@tabler/icons-react";
import React from "react";

const CryButton = ({ children, audio }) => (
  <div className="container">
    <button
      className="btn btn-secondary"
      onClick={() => {
        const cry = new Audio(audio);
        cry.volume = 0.2;
        cry.play();
      }}
    >
      <IconPlayerPlayFilled stroke={2} />
    </button>

    <p>Play {children}</p>
  </div>
);

const Cry = ({ cries }) => (
  <div className="container">
    {cries.legacy && <CryButton audio={cries.legacy}>Legacy Cry</CryButton>}
    {cries.latest && <CryButton audio={cries.latest}>Latest</CryButton>}
  </div>
);

export default Cry;
