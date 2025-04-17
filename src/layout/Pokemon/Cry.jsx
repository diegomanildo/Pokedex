import { IconPlayerPlayFilled } from "@tabler/icons-react";
import React from "react";

const CryButton = ({ label, audio }) => (
  <div className="d-flex flex-column align-items-center mx-3">
    <button
      className="rounded-circle p-3 border-0"
      onClick={() => {
        const cry = new Audio(audio);
        cry.volume = 0.2;
        cry.play();
      }}
      title={`Play ${label}`}
      style={{
        backgroundColor: "#3a3a3a",
        color: "#e0e0e0",
        transition: "transform 0.05s ease, background-color 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      // onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3a3a")}
      // onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2c2c2c")}
    >
      <IconPlayerPlayFilled stroke={2} size={28} />
    </button>
    <span
      className="mt-2 fw-medium text-center"
      style={{
        color: "#e0e0e0",
        fontSize: "0.9rem",
      }}
    >
      {label}
    </span>
  </div>
);

const Cry = ({ cries }) => {
  if (!cries.legacy && !cries.latest) return null;

  return (
    <div className="d-flex justify-content-center mt-3">
      {cries.legacy && <CryButton audio={cries.legacy} label="Legacy Cry" />}
      {cries.latest && <CryButton audio={cries.latest} label="Latest Cry" />}
    </div>
  );
};

export default Cry;
