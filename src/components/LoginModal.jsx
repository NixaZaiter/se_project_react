import { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import ModalWithForm from "./ModalWithForm";
import { validateLogin } from "../utils";

const LoginModal = ({
  isOpen,
  handleLogin,
  onClose,
  setIsLoggedIn,
  handleRegisterClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    setErrors(validateLogin(values));
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
    values.email.trim() &&
    values.password.trim();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (!Object.values(nextErrors).every((e) => !e)) {
      setTouched({ email: true, password: true });
      return;
    }

    handleLogin(values)
      .then(() => {
        setIsLoggedIn(true);
        setValues(defaultValues);
        setTouched({ email: false, password: false });
        onClose(evt);
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      title={"Log in"}
      name="log-in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="modal__field">
        <label className="modal__label" htmlFor="email">
          Email
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

      <div className="modal__field">
        <label className="modal__label" htmlFor="password">
          Password
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
      <div className="modal__field">
        <button
          id="form-login-btn"
          type="submit"
          className={`modal__save-btn ${
            !isValid ? "modal__save-btn_disabled" : ""
          }`}
          disabled={!isValid}
          onSubmit={handleSubmit}
        >
          Log In
        </button>

        <button
          id="form-signup-btn"
          type="button"
          className="modal__save-btn modal__save-btn_type_secondary"
          onClick={handleRegisterClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
