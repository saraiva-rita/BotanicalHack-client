import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import IsPrivate from './Components/IsPrivate';
import IsAnon from './Components/IsAnon';
import HomePage from './Pages/HomePage';
import AllPlantsPage from './Pages/AllPlants';
import PlantDetails from './Pages/PlantsDetails';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plants" element={<AllPlantsPage />} />
        <Route path="/plants/:plantId" element={<IsPrivate><PlantDetails /></IsPrivate>} />
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
    </div>
  );
}

export default App;
