import React from "react";
import "./AcceptButton.css";

interface AcceptButtonProps {
  onClick: () => void;
  label: string;
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ onClick, label }) => {
  return (
    <div className="AcceptButton-container">
      <button className="AcceptButton-button" onClick={onClick}>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default AcceptButton;
