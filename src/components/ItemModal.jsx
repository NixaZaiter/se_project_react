import { useContext } from "react";
import closeIcon from "../assets/close-icon-dark.svg";
import { CurrentUserContext } from "../contexts";

export default function ItemModal({
  isOpen,
  card,
  onClose,
  openConfirmationModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const handleConfirmation = () => {
    openConfirmationModal(card);
  };
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal_is-open" : ""}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal__container modal__container_type_img"
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close icon" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__img" />
        {isOwn && (
          <button onClick={handleConfirmation} className="modal__delete-btn">
            Delete item
          </button>
        )}
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather : {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
