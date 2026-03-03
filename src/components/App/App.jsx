import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  Header,
  Main,
  Profile,
  Footer,
  ItemModal,
  AddItemModal,
} from "../index";

import {
  getWeather,
  filterWeatherData,
  coordinates,
  apiKey,
  getClothes,
  addClothing,
} from "../../utils/index";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// TODO:
// Fix item card styles for irregular images
// Add deletion functionality
// (Maybe) Add confirmation modal
// Add reset form on submit code

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    banner: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ _id: "" });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  // Add Clothes
  const onAddItem = (data) => {
    addClothing(data)
      .then((data) => {
        setClothingItems([...clothingItems, data]);
      })
      .catch(console.error);
  };

  // Get Clothes
  useEffect(() => {
    getClothes()
      .then((data) => {
        const processedData = data.map((item) => {
          const { imageUrl, ...rest } = item;
          return { link: imageUrl, ...rest };
        });
        setClothingItems(processedData);
      })
      .catch(console.error);
  }, []);

  // Get Weather
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!activeModal) return;

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                weatherData={weatherData}
                handleCardClick={handleCardClick}
                clothingItems={clothingItems}
                handleAddClick={handleAddClick}
              />
            }
          />
        </Routes>

        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={handleCloseModal}
        ></AddItemModal>

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview-card"}
          onClose={handleCloseModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
