import "./noButton.css";

type TProps = {
  onNoClick: () => void;
  className: string;
};

function NoButton({ onNoClick, className }: TProps) {
  return (
    <div className={className}>
      <button className="noHeart" onClick={onNoClick}>
        NIE
      </button>
    </div>
  );
}

export default NoButton;
