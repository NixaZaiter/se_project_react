import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { validateAddItem } from "../../utils";

const LoginModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // track which fields were interacted with
  const [touched, setTouched] = useState({
    email: false,
    password: false,
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
    !errors.email &&
    !errors.imageUrl &&
    values.email.trim() &&
    values.password.trim();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const nextErrors = validateAddItem(values);
    setErrors(nextErrors);

    if (!Object.values(nextErrors).every((e) => !e)) {
      // mark all fields touched so errors become visible after submit attempt
      setTouched({ email: true, password: true });
      return;
    }

    onAddItem(values)
      .then(() => {
        // reset only after successful submit
        setValues(defaultValues);
        setTouched({ email: false, password: false });
        onClose(evt);
      })
      .catch(console.error);
  };

  return (
    <ModalWithForm
      buttonText={"Log In"}
      title={"Log in"}
      name="log-in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid} // pass validity to ModalWithForm
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
            aria-invalid={touched.email && !!errors.email}
            aria-errormessage="email-error"
          />
        </label>
        {errors.email && touched.email && (
          <span id="name-error" className="modal__error modal__error-visible">
            {errors.email}
          </span>
        )}
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
            aria-invalid={touched.password && !!errors.password}
            aria-errormessage="password-error"
          />
        </label>
        {errors.password && touched.password && (
          <span
            id="password-error"
            className="modal__error modal__error-visible"
          >
            {errors.password}
          </span>
        )}
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
