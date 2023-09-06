import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
      <div className="myPlants-banner">
        <div className="details-banner-wrapper orange-color">
          <div className="banner-content">
            <h2>My Plants</h2>
            <p>
              Welcome to Your Green Oasis!🌿Grow Your Plant Collection with Ease
              Discover, Track, and Nurture Your Beloved Plants
            </p>
          </div>
        </div>
      </div>
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
                <Tooltip title="Delete">
                  <IconButton>
                    <button
                      style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                      }}
                      onClick={() => removeMyPlants(plant._id)}
                    >
                      <DeleteIcon sx={{ color: 'grey.700' }} />
                    </button>
                  </IconButton>
                </Tooltip>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default MyPlantsPage;
