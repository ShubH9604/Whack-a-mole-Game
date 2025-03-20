import React from "react";
import "./Mole.css";

const Mole = ({ isMole, onClick }) => {
  return (
    <div className={`mole ${isMole ? "active" : ""}`} onClick={onClick}></div>
  );
};

export default Mole;