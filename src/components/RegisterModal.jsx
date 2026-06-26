import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";
import { validateSignup } from "../utils";

const RegisterModal = ({
  isOpen,
  onSignup,
  onClose,
  setIsLoggedIn,
  handleLoginClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatarURL: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    avatarURL: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    name: false,
    avatarURL: false,
  });

  useEffect(() => {
    setErrors(validateSignup(values));
  }, [values]);

  const handleFieldChange = (evt) => {
    const { name } = evt.target;
    handleChange(evt);
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (evt) => {
    const { name } = evt.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid =
    !errors.email &&
    !errors.password &&
    !errors.name &&
    !errors.avatarURL &&
    values.email &&
    values.password &&
    values.name &&
    values.avatarURL;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (!Object.values(nextErrors).every((e) => !e)) {
      setTouched({ email: true, password: true, name: true, avatarURL: true });
      return;
    }

    onSignup(values)
      .then(() => {
        setIsLoggedIn(true);
        setValues(defaultValues);
        setTouched({
          email: false,
          password: false,
          name: false,
          avatarURL: false,
        });
        onClose(evt);
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title={"Sign Up"}
      name="signup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      {/*Email Field*/}
      <div className="modal__field">
        <label className="modal__label" htmlFor="email">
          Email *
          <input
            type="email"
            name="email"
            id="email"
            className={`modal__input modal__input_type_text ${
              errors.email && touched.email ? "modal__input_type_error" : ""
            }`}
            placeholder="Email"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </label>
        <span
          style={{
            visibility: errors.email && touched.email ? "visible" : "hidden",
          }}
          className="modal__error"
        >
          {errors.email && touched.email ? `${errors.email}` : ""}
        </span>
      </div>
      {/*Password Field*/}
      <div className="modal__field">
        <label className="modal__label" htmlFor="password">
          Password *
          <input
            type="password"
            name="password"
            id="password"
            className={`modal__input modal__input_type_text ${
              errors.password && touched.password
                ? "modal__input_type_error"
                : ""
            }`}
            placeholder="Password"
            minLength="8"
            maxLength="20"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.password}
          />
        </label>
        <span
          style={{
            visibility:
              errors.password && touched.password ? "visible" : "hidden",
          }}
          className="modal__error "
        >
          {errors.password && touched.password ? `${errors.password}` : ""}
        </span>
      </div>
      {/*Name Field*/}
      <div className="modal__field">
        <label className="modal__label" htmlFor="name">
          Name *
          <input
            type="text"
            name="name"
            id="name"
            className={`modal__input modal__input_type_text ${
              errors.name && touched.name ? "modal__input_type_error" : ""
            }`}
            placeholder="Name"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.name}
          />
        </label>
        <span
          style={{
            visibility: errors.name && touched.name ? "visible" : "hidden",
          }}
          className="modal__error"
        >
          {errors.name && touched.name ? `${errors.name}` : ""}
        </span>
      </div>
      {/*Avatar Field*/}
      <div className="modal__field">
        <label className="modal__label" htmlFor="avatarURL">
          Avatar URL *
          <input
            type="url"
            name="avatarURL"
            id="avatarURL"
            className={`modal__input modal__input_type_text ${
              errors.avatarURL && touched.avatarURL
                ? "modal__input_type_error"
                : ""
            }`}
            placeholder="Avatar URL"
            required
            onChange={handleFieldChange}
            onBlur={handleBlur}
            value={values.avatarURL}
          />
        </label>
        <span
          style={{
            visibility:
              errors.avatarURL && touched.avatarURL ? "visible" : "hidden",
          }}
          className="modal__error"
        >
          {errors.avatarURL && touched.avatarURL ? `${errors.avatarURL}` : ""}
        </span>
      </div>
      {/*Sign Up Button*/}
      <div className="modal__field">
        <button
          id="form-signup-btn"
          type="submit"
          className={`modal__save-btn ${
            !isValid ? "modal__save-btn_disabled" : ""
          }`}
          onSubmit={handleSubmit}
          disabled={!isValid}
        >
          Sign Up
        </button>
        {/*Login Button*/}
        <button
          id="form-login-btn"
          type="button"
          className="modal__save-btn modal__save-btn_type_secondary"
          onClick={handleLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
