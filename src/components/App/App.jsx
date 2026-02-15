import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({ _id: "" });
  const [selectedRadioOption, setSelectedRadioOption] = useState("hot");

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

  return (
    <div className="page">
      <Header handleAddClick={handleAddClick} />
      <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      <Footer />
      <ModalWithForm
        buttonText={"Add garment"}
        title={"New garment"}
        isOpen={activeModal}
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
        isOpen={activeModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
