import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../Components/Searchbar';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const API_URL = 'http://localhost:5005';

function AllPlantsPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlant, setFilteredPlant] = useState(plants);
  const location = useLocation();
  const { category, description } = location.state || {};

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants`)
      .then((response) => {
        if (category) {
          console.log('category', category);
          const result = response.data.filter(
            (plant) => plant.category === category
          );
          setPlants(result);
          setFilteredPlant(result);
        } else {
          setPlants(response.data);
          setFilteredPlant(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, [category]);

  const searchPlant = (searchedName) => {
    if (searchedName === '') {
      setFilteredPlant(plants);
      return;
    }
    const result = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchedName)
    );

    setFilteredPlant(result);
  };

  return (
    <div>
      {category && (
        <div className="hero-banner-categories">
          <h3>{category}</h3>
          <p>{description}</p>
        </div>
      )}
      <div className="all-plants-page"></div>

      <SearchBar searchPlant={searchPlant} />
      <h2>All Plants</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: 1350, height: 730 }}>
          <ImageList variant="masonry" cols={4} gap={10}>
            {filteredPlant &&
              filteredPlant.map((plant) => {
                return (
                  <ImageListItem key={plant._id}>
                    <div key={plant._id}>
                      <Link
                        to={`/plants/${plant._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <img
                          src={`${plant.image}?w=50&fit=crop&auto=format`}
                          srcSet={`${plant.image}?w=50&fit=crop&auto=format&dpr=2 2x`}
                          alt={plant.name}
                          loading="lazy"
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <h3 style={{ textAlign: 'center' }}>{plant.name} </h3>
                      </Link>
                    </div>
                  </ImageListItem>
                );
              })}
          </ImageList>
        </Box>
      </div>
    </div>
  );
}
export default AllPlantsPage;
