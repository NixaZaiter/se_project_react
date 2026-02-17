import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card__container">
      <button className="card__btn">
        <h2 className="card__label">{item.name}</h2>
        <img
          onClick={handleCardClick}
          src={item.link}
          alt={item.name}
          className="card__img"
        />
      </button>
    </div>
  );
}
export default ItemCard;
