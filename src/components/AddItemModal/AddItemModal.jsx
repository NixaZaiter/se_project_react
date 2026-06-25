import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { validateAddItem } from "../../utils";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // track which fields were interacted with
  const [touched, setTouched] = useState({
    name: false,
    imageUrl: false,
    weather: false,
  });

  useEffect(() => {
    setErrors(validateAddItem(values));
  }, [values]);

  // NOTE: removed auto-reset on modal close so fields persist until a successful submit.
  // If you want to clear when modal opens, add logic that runs on open instead.

  // wrapper so we can mark a field touched on change
  const handleFieldChange = (evt) => {
    const { name } = evt.target;
    handleChange(evt);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // mark touched on blur as well (useful if user leaves field)
  const handleBlur = (evt) => {
    const { name } = evt.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid =
    !errors.name &&
    !errors.imageUrl &&
    !errors.weather &&
    values.name.trim() &&
    values.imageUrl.trim() &&
    values.weather;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateAddItem(values);
    setErrors(nextErrors);

    if (!Object.values(nextErrors).every((e) => !e)) {
      // mark all fields touched so errors become visible after submit attempt
      setTouched({ name: true, imageUrl: true, weather: true });
      return;
    }

    onAddItem(values)
      .then(() => {
        // reset only after successful submit
        setValues(defaultValues);
        setTouched({ name: false, imageUrl: false, weather: false });
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
      isValid={isValid} // pass validity to ModalWithForm
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            className={`modal__input modal__input_type_text ${
              errors.name && touched.name ? "modal__input_type_error" : ""
            }`}
            placeholder="Name"
            minLength="2"
            maxLength="15"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.name}
            aria-invalid={touched.name && !!errors.name}
            aria-errormessage="name-error"
          />
        </label>
        {errors.name && touched.name && (
          <span id="name-error" className="modal__error modal__error-visible">
            {errors.name}
          </span>
        )}
      </div>

      <div className="modal__field">
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            className={`modal__input modal__input_type_text ${
              errors.imageUrl && touched.imageUrl
                ? "modal__input_type_error"
                : ""
            }`}
            placeholder="Image URL"
            minLength="2"
            maxLength="200"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.imageUrl}
            aria-invalid={touched.imageUrl && !!errors.imageUrl}
            aria-errormessage="image-error"
          />
        </label>
        {errors.imageUrl && touched.imageUrl && (
          <span id="image-error" className="modal__error modal__error-visible">
            {errors.imageUrl}
          </span>
        )}
      </div>

      <fieldset className="modal__radio-buttons" aria-describedby="radio-error">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            value={"hot"}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            checked={values.weather === "hot"}
            type="radio"
            className="modal__radio-input"
          />
          {"Hot"}
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            onChange={handleFieldChange}
            onBlur={handleBlur}
            checked={values.weather === "warm"}
            type="radio"
            className="modal__radio-input"
          />
          {"Warm"}
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            value="cold"
            onChange={handleFieldChange}
            onBlur={handleBlur}
            checked={values.weather === "cold"}
            type="radio"
            className="modal__radio-input"
          />
          {"Cold"}
        </label>
        {errors.weather && touched.weather && (
          <span id="radio-error" className="modal__error modal__error-visible">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
