import "./DeclineButton.css";

interface DeclineButtonProps {
  onClick?: () => void;
  label?: string;
}

const DeclineButton = ({ onClick, label }: DeclineButtonProps) => {
  return (
    <div className="DeclineButton-container">
      <button className="DeclineButton-button" onClick={onClick}>
        <span>{label}</span>
      </button>
    </div>
  );
};

export default DeclineButton;
