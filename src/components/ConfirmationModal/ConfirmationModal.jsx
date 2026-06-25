import "./ConfirmationModal.css";
import closeIcon from "../../assets/close-icon-dark.svg";

export default function ConfirmationModal({ isOpen, card, onClose, onDelete }) {
  const handleDelete = () => {
    onDelete(card);
  };
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_is-open" : ""}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__container modal__container_type_confirmation-modal"
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close icon" />
        </button>
        <p className="modal__text">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>
        <button
          onClick={handleDelete}
          className="modal__delete-btn modal__delete-btn_type_confirmation-modal"
        >
          Yes, delete item
        </button>
        <button onClick={onClose} className="modal__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
