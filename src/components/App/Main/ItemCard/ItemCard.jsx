import "./ItemCard.css";
const temperature = "75";
function ItemCard() {
  return (
    <div className="item">
      <h1 className="item__header">
        Today is {temperature} / You may want to wear:
      </h1>
    </div>
  );
}
export default ItemCard;
