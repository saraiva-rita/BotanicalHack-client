import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/Searchbar";
import { useLocation } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AllPlantsPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlant, setFilteredPlant] = useState(plants);
  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants`)
      .then((response) => {
        if (category) {
          console.log('category', category)
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
    if (searchedName === "") {
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
      <div className="all-plants-page"></div>
      <div>
        <SearchBar searchPlant={searchPlant} />
        <h2>All Plants {filteredPlant && filteredPlant.length}</h2>
        {filteredPlant &&
          filteredPlant.map((plant) => {
            return (
              <div key={plant._id}>
                <Link to={`/plants/${plant._id}`}>
                  <h3>{plant.name}</h3>
                  <img src={plant.image} alt="Plant image" />
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default AllPlantsPage;
