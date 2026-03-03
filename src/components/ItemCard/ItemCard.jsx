import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item-card">
      <div className="item-card__container">
        <h2 className="item-card__label">{item.name}</h2>
        <img
          onClick={handleCardClick}
          src={item.link}
          alt={item.name}
          className="item-card__img"
        />
      </div>
    </li>
  );
}
