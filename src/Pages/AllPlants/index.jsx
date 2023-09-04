import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/Searchbar";

const API_URL = "http://localhost:5005";

function AllPlantsPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlant, setFilteredPlant] = useState(plants);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants`)
      .then((response) => {
        setPlants(response.data);
        setFilteredPlant(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchPlant = (searchedName) => {
    if (searchedName === "") {
      setFilteredPlant(plants);
      return;
    }
    const result = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchedName)
    );
    console.log('result', result)
    console.log('searchedName', searchedName)
    console.log('plants', plants)
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
