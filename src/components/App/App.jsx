import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    banner: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ _id: "" });
  const [selectedRadioOption, setSelectedRadioOption] = useState("");
  const [clothingItems, setClothingItems] = useState([]);

  const handleRadioOptionChange = (e) => {
    setSelectedRadioOption(e.target.value);
  };

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

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <Header handleAddClick={handleAddClick} weatherData={weatherData} />
      <Main
        weatherData={weatherData}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
      <Footer />
      <ModalWithForm
        buttonText={"Add garment"}
        title={"New garment"}
        isOpen={activeModal === "add-garment"}
        name="add-garment"
        onClose={handleCloseModal}
      >
        <div className="modal__field">
          <label className="modal__label" htmlFor="name">
            Name
            <input
              type="text"
              required
              id="name"
              className="modal__input modal__input_type_text"
              placeholder="Name"
              minLength="2"
              maxLength="40"
            />
            <span id="name-error" className="modal__error"></span>
          </label>
        </div>
        <div className="modal__field">
          <label className="modal__label" htmlFor="imageUrl">
            Image
            <input
              type="url"
              required
              id="imageUrl"
              className="modal__input modal__input_type_text"
              placeholder="Image URL"
              minLength="2"
              maxLength="200"
            />
            <span id="imageUrl-error" className="modal__error"></span>
          </label>
        </div>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              value="hot"
              checked={selectedRadioOption === "hot"}
              onChange={handleRadioOptionChange}
              type="radio"
              className="modal__radio-input"
              name="temperatures"
            />
            {"Hot"}
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              value="warm"
              checked={selectedRadioOption === "warm"}
              onChange={handleRadioOptionChange}
              type="radio"
              className="modal__radio-input"
              name="temperatures"
            />
            {"Warm"}
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              value="cold"
              checked={selectedRadioOption === "cold"}
              onChange={handleRadioOptionChange}
              type="radio"
              className="modal__radio-input"
              name="temperatures"
            />
            {"Cold"}
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview-card"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
