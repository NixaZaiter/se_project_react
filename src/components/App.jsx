import { useEffect, useState, useMemo, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Styles
import "./styles/App.css";

// Components
import {
  AddItemModal,
  ConfirmationModal,
  Footer,
  Header,
  ItemModal,
  Loading,
  LoginModal,
  Main,
  Profile,
  ProtectedRoute,
  RegisterModal,
} from "./index";

// Utils
import {
  addClothes,
  apiKey,
  coordinates,
  filterWeatherData,
  getClothes,
  getWeather,
  loginRequest,
  removeClothes,
  signupRequest,
  tokenCheck,
} from "../utils/index";

// Contexts
import {
  CurrentTemperatureUnitContext,
  CurrentUserContext,
} from "../contexts/index";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "Unavailible", // <- default when coords not provided
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatarURL: "",
  });

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

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("signup");
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

  const handleSignup = (data) => {
    return signupRequest(data);
  };

  const handleLogin = (data) => {
    return loginRequest(data).then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
      }
    });
  };

  // Combined initial load: fetch clothes + weather, then hide loading
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setIsLoading(true);
      try {
        // start clothes request immediately
        const clothesPromise = getClothes();

        // try to get browser geolocation with a timeout, fallback to hardcoded coordinates
        const resolveCoords = () =>
          new Promise((resolve) => {
            // fallback if geolocation not supported
            if (!("geolocation" in navigator)) {
              resolve(coordinates);
              return;
            }

            const timeout = setTimeout(() => {
              // timeout -> fallback
              resolve(coordinates);
            }, 10000); // 10s timeout

            navigator.geolocation.getCurrentPosition(
              (pos) => {
                clearTimeout(timeout);
                resolve({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                });
              },
              () => {
                clearTimeout(timeout);
                resolve(coordinates);
              },
              { timeout: 10000 },
            );
          });

        const [clothesData, coordsForWeather] = await Promise.all([
          clothesPromise,
          resolveCoords(),
        ]);

        if (!mounted) return;

        setClothingItems(clothesData.data || []);

        // only fetch weather when we have coords
        if (coordsForWeather && coordsForWeather.latitude != null) {
          const weatherRaw = await getWeather(coordsForWeather, apiKey);
          if (!mounted) return;
          const filteredData = filterWeatherData(weatherRaw);
          setWeatherData(filteredData);
        } else {
          // no coords available — set default city name and skip weather fetch
          setWeatherData((prev) => ({ ...prev, city: "Unavailible" }));
        }
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    tokenCheck(token)
      .then(({ data }) => {
        setCurrentUser({ name: data.name, avatarURL: data.avatar });
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  console.log(currentUser);
  console.log(isLoggedIn);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider value={contextValue}>
          <Header
            handleLoginClick={handleLoginClick}
            handleRegisterClick={handleRegisterClick}
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                isLoading ? (
                  <Loading />
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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
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
          <LoginModal
            handleRegisterClick={handleRegisterClick}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            onClose={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
          />
          <RegisterModal
            handleLoginClick={handleLoginClick}
            isOpen={activeModal === "signup"}
            handleSignup={handleSignup}
            onClose={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
