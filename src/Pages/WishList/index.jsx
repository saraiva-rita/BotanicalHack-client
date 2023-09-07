import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function WishListPage() {
  const [wishList, setWishList] = useState(null);

  const API_URL = 'https://botanicalhack.onrender.com';
  //const API_URL = "http://localhost:5005";

  const [fetchMyPlants, setFetchMyPlants] = useState(true);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (fetchMyPlants) {
      axios
        .get(`${API_URL}/api/wishList`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setWishList(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setFetchMyPlants(false));
    }
  }, [storedToken, fetchMyPlants]);

  const removeWishList = (plantId) => {
    axios
      .delete(`${API_URL}/api/wishList/${plantId}/removeWishList`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setFetchMyPlants(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="wishList-banner">
        <div className="details-banner-wrapper brown-color">
          <div className="banner-content">
            <h2>My Wishlist</h2>
            <p>
              Plant Dreams, Grow Wishes 🌿 Welcome to Your Botanical Wishlist!
              Discover Your Dream Plants and Add Your Favorites to Your Wishlist
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          margin: "30px",
        }}
      >
        {wishList &&
          wishList.map((plant) => {
            return (
              <div
                key={plant._id}
                style={{ width: "300px", margin: "10px", textAlign: "center" }}
              >
                <Link
                  to={`/plants/${plant._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={plant.image}
                    style={{ width: "100%", height: "auto", margin: "10px" }}
                    alt="Plant image"
                  />
                </Link>
                <Link
                  to={`/plants/${plant._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {plant.name}
                </Link>
                <Tooltip title="Delete">
                  <IconButton>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => removeWishList(plant._id)}
                    >
                      <DeleteIcon sx={{ color: "grey.700" }} />
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
export default WishListPage;
