import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

const API_URL = 'http://localhost:5005';

function AllPlantsPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants`)
      .then((response) => setPlants(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>All Plants</h2>
      {plants.map((plant) => {
        return (
          <div key={plant._id}>
            <Link to={`/plants/${plant._id}`}>
              <h3>{plant.name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default AllPlantsPage;
