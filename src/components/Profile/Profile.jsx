import "./Profile.css";

import { SideBar, ClothesSection } from "../index";

export default function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddClick={handleAddClick}
      />
    </section>
  );
}
