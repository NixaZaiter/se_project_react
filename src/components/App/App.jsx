import { useEffect, useState, useMemo, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  Header,
  Main,
  Profile,
  Footer,
  ItemModal,
  AddItemModal,
  ConfirmationModal,
} from "../index";
import LoadingPage from "../Loading/Loading";

import {
  getWeather,
  filterWeatherData,
  coordinates,
  apiKey,
  getClothes,
  addClothes,
  removeClothes,
} from "../../utils/index";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { fahrenheit: 999, celsius: 999 },
    banner: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ _id: "" });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState("fahrenheit");
  const [isLoading, setIsLoading] = useState(true);

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm-delete");
  };

  const handleDeleteCard = (selectedCard) => {
    removeClothes(selectedCard._id)
      .then(() => {
        const filteredClothes = clothingItems.filter(
          (item) => item._id !== selectedCard._id,
        );
        setClothingItems(filteredClothes);
        setSelectedCard({ _id: "" });
        setActiveModal("");
      })
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = useCallback(() => {
    setCurrentTemperatureUnit((prev) =>
      prev === "fahrenheit" ? "celsius" : "fahrenheit",
    );
  }, []);

  const contextValue = useMemo(
    () => ({ currentTemperatureUnit, handleToggleSwitchChange }),
    [currentTemperatureUnit, handleToggleSwitchChange],
  );

  // Add Clothes
  const onAddItem = (data) => {
    return addClothes(data)
      .then((data) => {
        // use functional update to avoid stale closure
        setClothingItems((prev) => [...prev, data]);
      })
      .catch(console.error);
  };

  // Combined initial load: fetch clothes + weather, then hide loading
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      setIsLoading(true);
      try {
        const [clothesData, weatherRaw] = await Promise.all([
          getClothes(),
          getWeather(coordinates, apiKey),
        ]);
        if (!mounted) return;
        setClothingItems(clothesData || []);
        const filteredData = filterWeatherData(weatherRaw);
        setWeatherData(filteredData);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
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
      <CurrentTemperatureUnitContext.Provider value={contextValue}>
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <LoadingPage />
              ) : (
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
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
          openConfirmationModal={openConfirmationModal}
          clothingItems={clothingItems}
          setClothingItems={setClothingItems}
        />
        <ConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          card={selectedCard}
          onClose={handleCloseModal}
          onDelete={handleDeleteCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
