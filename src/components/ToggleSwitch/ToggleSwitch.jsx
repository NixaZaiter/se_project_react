import { useContext } from "react";
import "./ToggleSwitch.css";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  const checked = currentTemperatureUnit === "celsius";

  return (
    <label className="toggle-switch" aria-label="Toggle temperature unit">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
        checked={checked}
        aria-checked={checked}
      />
      <span className="toggle-switch__temperature toggle-switch__temperature_celsius">
        C
      </span>
      <span className="toggle-switch__temperature toggle-switch__temperature_fahrenheit">
        F
      </span>
      <span className="toggle-switch__circle" />
    </label>
  );
}
