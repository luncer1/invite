import "./ConfirmationAlert.css";
import AcceptButton from "../AcceptButton/AcceptButton";
import DeclineButton from "../DeclineButton/DeclineButton";

interface ConfirmationAlertProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  show: boolean;
  message: string;
}
const ConfirmationAlert = ({
  onConfirm,
  onCancel,
  show,
  message,
}: ConfirmationAlertProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="confirmation-alert-overlay" onClick={handleCancel} />
      <div className="confirmation-alert">
        <div className="confirmation-alert__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="9 12 11 14 15 10"></polyline>
          </svg>
        </div>
        <div className="confirmation-alert__message">
          <p>{message}</p>
        </div>
        <div className="confirmation-alert__actions">
          <AcceptButton label="Potwierdź" onClick={handleConfirm} />
          <DeclineButton label="Odrzuć" onClick={handleCancel} />
        </div>
      </div>
    </>
  );
};

export default ConfirmationAlert;
