import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PlantDetails() {
  const [foundPlant, setfoundPlant] = useState(null);
  //const [fetching, setFetching] = useState(true);

  const API_URL = "http://localhost:5005";

  const { plantId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const onePlant = response.data;
        setfoundPlant(onePlant);
      })
      .catch((error) => console.log(error));
  }, [plantId]);

  return (
    <div>
      {foundPlant && (
        <div>
          <h1>{foundPlant.name}</h1>
          <p>{foundPlant.description}</p>
          <img src={"/images/allPlants.jpg"} alt="Plant image" />
          <p>{foundPlant.tips}</p>
        </div>
      )}
    </div>
  );
}

export default PlantDetails;
