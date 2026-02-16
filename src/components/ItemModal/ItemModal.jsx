import "./ItemModal.css";
import closeIcon from "../../assets/close-icon-dark.svg";
function ItemModal({ isOpen, card, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`modal ${isOpen === "preview-card" ? "modal_is-open" : ""}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__container modal__container_type_img"
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
