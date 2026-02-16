import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon-dark.svg";

function ModalWithForm({ children, buttonText, title, isOpen, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen === "add-garment" ? "modal_is-open" : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close icon" />
        </button>
        {/* Form */}
        <form className="modal__form" noValidate>
          {children}
          {/* Save btn */}
          <div className="modal__field">
            <button
              type="submit"
              id="form-save-btn"
              className="modal__input modal__input_type_btn"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
