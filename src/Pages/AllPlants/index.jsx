import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../Components/Searchbar";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const API_URL = 'https://botanicalhack.onrender.com';
//const API_URL = "http://localhost:5005";

function AllPlantsPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlant, setFilteredPlant] = useState(plants);
  const location = useLocation();
  const { category, description, image } = location.state || {};

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plants`)
      .then((response) => {
        if (category) {
          console.log("category", category);
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
      <div
        style={{
          height: "450px",
          position: "relative",
          backgroundImage: image
            ? `url(${image})`
            : "url(/images/AllPlantsPage.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="details-banner-wrapper yellow-color">
          <div className="banner-content">
            <h3>{category ?? "All Plants"}</h3>
            <p>
              {description ??
                "Explore a Diverse Array of Green Beauties and Find the Perfect Additions for Your Oasis 🍀 Scroll Through a Verdant Wonderland Your Garden Awaits!"}
            </p>
          </div>
        </div>
      </div>

      <div style={{ margin: "20px 0 10px 0", textAlign: 'center' }}>
        <SearchBar searchPlant={searchPlant}  />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: 1350, height: 730 }}>
          <ImageList variant="masonry" cols={4} gap={15}>
            {filteredPlant &&
              filteredPlant.map((plant) => {
                return (
                  <ImageListItem
                    key={plant._id}
                    sx={{ border: 1, borderColor: "grey.500" }}
                  >
                    <div key={plant._id}>
                      <Link
                        to={`/plants/${plant._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <img
                          src={`${plant.image}?w=50&fit=crop&auto=format`}
                          srcSet={`${plant.image}?w=50&fit=crop&auto=format&dpr=2 2x`}
                          alt={plant.name}
                          loading="lazy"
                          style={{ width: "100%", height: "auto" }}
                        />
                        <h3 style={{ textAlign: "center" }}>{plant.name} </h3>
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
