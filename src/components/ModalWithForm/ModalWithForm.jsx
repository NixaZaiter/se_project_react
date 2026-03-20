import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon-dark.svg";
import { useEffect, useRef } from "react";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  name,
  onClose,
  onSubmit,
  isValid = false, // changed default prop to false
}) {
  const containerRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveRef.current = document.activeElement;
      // focus first focusable inside modal
      const focusable = containerRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      lastActiveRef.current?.focus?.();
    }
  }, [isOpen]);

  return (
    <div
      onClick={onClose}
      className={`modal modal_type_${name} ${isOpen ? "modal_is-open" : ""}`}
      role="presentation"
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${name}`}
        tabIndex={-1}
      >
        <h2 id={`modal-title-${name}`} className="modal__title">
          {title}
        </h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close icon" />
        </button>
        {/* Form */}
        <form
          className={`modal__form modal__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          {/* Save btn */}
          <div className="modal__field">
            <button
              id="form-save-btn"
              type="submit"
              className={`modal__save-btn ${
                !isValid ? "modal__save-btn_disabled" : ""
              }`}
              disabled={!isValid}
              aria-disabled={!isValid}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
