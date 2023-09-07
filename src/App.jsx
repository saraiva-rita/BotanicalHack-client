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
/* import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    green: {
      main: "#227A60",
      contrastText:"#ffffff"
    },
    red: {
      main: "#c62828",
    },
    orange: {
      main: 'rgba(220, 117, 42, 0.7)',
    }
  },
}); */
function App() {
  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
        <Navbar />

        <Routes>
          <Route path="/about" element={<About />} />
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
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
