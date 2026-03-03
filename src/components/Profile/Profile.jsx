import "./Profile.css";

import { SideBar, ClothesSection } from "../index";

export default function Profile({
  weatherData,
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={handleAddClick}
      />
    </section>
  );
}
