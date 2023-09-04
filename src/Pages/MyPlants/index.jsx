import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function MyPlantsPage() {
  const [user, setUser] = useState(null);

  const API_URL = 'http://localhost:5005';

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

  return (
    <div>
      <div className="myPlants-banner"></div>
      {user.myPlants.map((plant) => {
        return (
          <div>
            <h3>{plant.name}</h3>
            <img src={plant.image} alt="Plant image" />
          </div>
        );
      })}
    </div>
  );
}
export default MyPlantsPage;
