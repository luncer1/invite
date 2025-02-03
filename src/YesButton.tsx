import React from "react";
import "./yesButton.css";

type TProps = {
  onYesClick: () => void;
  className: string;
};

function YesButton({ onYesClick, className }: TProps) {
  return (
    <div className={className}>
      <button className="yesHeart" onClick={onYesClick}>
        TAK
      </button>
    </div>
  );
}

export default YesButton;
