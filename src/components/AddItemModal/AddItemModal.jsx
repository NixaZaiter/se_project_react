import useForm from "../../hooks/useForm";
import { ModalWithForm } from "../index";
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    link: "",
    weather: "hot",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values)
      .then(() => {
        setValues(defaultValues);
        onClose(evt);
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      buttonText={"Add garment"}
      title={"New garment"}
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            className="modal__input modal__input_type_text"
            placeholder="Name"
            minLength="2"
            maxLength="15"
            required
            onChange={handleChange}
            value={values.name}
          />
        </label>
      </div>
      <div className="modal__field">
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            type="url"
            name="link"
            id="imageUrl"
            className="modal__input modal__input_type_text"
            placeholder="Image URL"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChange}
            value={values.link}
          />
        </label>
      </div>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend" required>
          Select the weather type:
        </legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            value={"hot"}
            onChange={handleChange}
            checked={values.weather === "hot"}
            type="radio"
            className="modal__radio-input"
            required
          />
          {"Hot"}
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
            type="radio"
            className="modal__radio-input"
            required
          />
          {"Warm"}
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
            type="radio"
            className="modal__radio-input"
            required
          />
          {"Cold"}
        </label>
        <span className="modal__error"></span>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
