import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import IsPrivate from "./Components/IsPrivate";
import IsAnon from "./Components/IsAnon";
import HomePage from "./Pages/HomePage";
import AllPlantsPage from "./Pages/AllPlants";
import PlantDetails from "./Pages/PlantsDetails";
import ProfilePage from "./Pages/ProfilePage";
import MyPlantsPage from "./Pages/MyPlants";
import WishListPage from "./Pages/WishList";
import About from "./Pages/AboutPage";
import Contacts from "./Pages/ContactsPage";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

function App() {
  const materialTheme = materialExtendTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#227A60",
      },
      secondary: {
        main: "#c62828",
      },
    },
  });

  return (
    <div>
      <MaterialCssVarsProvider
        defaultMode="light"
        theme={{ [MATERIAL_THEME_ID]: materialTheme }}
      >
        <JoyCssVarsProvider>
          <Navbar />

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/plants" element={<AllPlantsPage />} />
            <Route
              path="/plants/:plantId"
              element={
                <IsPrivate>
                  <PlantDetails />
                </IsPrivate>
              }
            />
            <Route
              path="/myPlants"
              element={
                <IsPrivate>
                  <MyPlantsPage />
                </IsPrivate>
              }
            />
            <Route
              path="/wishList"
              element={
                <IsPrivate>
                  <WishListPage />
                </IsPrivate>
              }
            />
            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />
          </Routes>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </div>
  );
}

export default App;
