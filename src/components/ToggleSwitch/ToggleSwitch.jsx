import { useContext } from "react";
import "./ToggleSwitch.css";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__temperature toggle-switch__temperature_celcius">
        C
      </span>
      <span className="toggle-switch__temperature toggle-switch__temperature_farenheit">
        F
      </span>
      <span className="toggle-switch__circle" />
    </label>
  );
}
