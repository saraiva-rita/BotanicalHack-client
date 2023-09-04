import axios from 'axios';
import { useState, useEffect } from 'react';

function MyPlantsPage() {
  const [myPlants, setMyPlants] = useState(null);

  const API_URL = 'http://localhost:5005';

  const [fetchMyPlants, setFetchMyPlants] = useState(true);

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (fetchMyPlants) {
      axios
        .get(`${API_URL}/api/myPlants`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setMyPlants(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setFetchMyPlants(false));
    }
  }, [storedToken, fetchMyPlants]);

  const removeMyPlants = (plantId) => {
    axios
      .delete(`${API_URL}/api/myPlants/${plantId}/removeMyPlants`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setFetchMyPlants(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="myPlants-banner"></div>
      {myPlants &&
        myPlants.map((plant) => {
          return (
            <div key={plant._id}>
              <h3>{plant.name}</h3>
              <img src={plant.image} alt="Plant image" />
              <button onClick={() => removeMyPlants(plant._id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
export default MyPlantsPage;
