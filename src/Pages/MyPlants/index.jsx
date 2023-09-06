import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <h2>My Plants</h2>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          margin: '30px',
        }}
      >
        {myPlants &&
          myPlants.map((plant) => {
            return (
              <div key={plant._id} style={{ width: '300px', margin: '10px' }}>
                <Link
                  to={`/plants/${plant._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {plant.name}
                </Link>
                <div>
                  <img
                    src={plant.image}
                    style={{ width: '100%', height: 'auto' }}
                    alt="Plant image"
                  />
                </div>
                <button onClick={() => removeMyPlants(plant._id)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default MyPlantsPage;
