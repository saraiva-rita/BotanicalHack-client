import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import PetsIcon from "@mui/icons-material/Pets";
import LightModeIcon from "@mui/icons-material/LightMode";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function PlantDetails() {
  const [foundPlant, setfoundPlant] = useState(null);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const [shouldGetPlant, setShouldGetPlant] = useState(true);

  const [user, setUser] = useState(null);
  const [shouldGetUser, setShouldGetUser] = useState(true);

  const [isInMyPlants, setIsInMyPlants] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);

  const API_URL = "https://botanicalhack.onrender.com";
  //const API_URL = "http://localhost:5005";

  const { plantId } = useParams();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (shouldGetPlant) {
      axios
        .get(`${API_URL}/api/plants/${plantId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const onePlant = response.data;
          setfoundPlant(onePlant);
        })
        .catch((error) => console.log(error))
        .finally(() => setShouldGetPlant(false));
    }
  }, [plantId, shouldGetPlant, storedToken]);

  // Add New Review

  const handleSubmitAddReview = (e) => {
    e.preventDefault();

    const requestBody = { content, rating };

    axios
      .post(`${API_URL}/api/plants/${plantId}/createReview`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShouldGetPlant(true);
        setShouldGetUser(true);
        setContent("");
        setRating(0);
      })
      .catch((error) => console.log(error));
  };

  const deleteReview = async (reviewId) => {
    try {
      setShouldGetPlant(true);
      setShouldGetUser(true);
      await axios.delete(
        `${API_URL}/api/plants/${plantId}/${reviewId}/deleteReview`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shouldGetUser) {
      axios
        .get(`${API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const oneUser = response.data;
          setUser(oneUser);
        })
        .catch((error) => console.log(error))
        .finally(() => setShouldGetUser(false));
    }
  }, [storedToken, shouldGetUser]);

  useEffect(() => {
    if (user) {
      setIsInMyPlants(user.myPlants.includes(plantId));
      setIsInWishList(user.wishList.includes(plantId));
    }
  }, [plantId, user]);

  // Add / Remove Plants to MyPlants
  const toggleMyPlants = () => {
    console.log(isInMyPlants);
    if (isInMyPlants) {
      // remove from my plants
      axios
        .delete(`${API_URL}/api/myPlants/${plantId}/removeMyPlants`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setShouldGetPlant(true);
          setIsInMyPlants(false);
        })
        .catch((error) => console.log(error));
    } else {
      // add to myPlants
      axios
        .post(`${API_URL}/api/plants/${plantId}/addMyPlants`, "", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setShouldGetPlant(true);
          setIsInMyPlants(true);
        })
        .catch((error) => console.log(error));
    }
  };

  // Add / Remove Plants to Wishlist
  const toggleWishList = () => {
    if (isInWishList) {
      // remove from wishlist
      axios
        .delete(`${API_URL}/api/wishList/${plantId}/removeWishList`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setShouldGetPlant(true);
          setIsInWishList(false);
        })
        .catch((error) => console.log(error));
    } else {
      // add to wishList

      axios
        .post(`${API_URL}/api/plants/${plantId}/addToWishList`, "", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setShouldGetPlant(true);
          setIsInWishList(true);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <div className="plants-details-banner">
        <div className="details-banner-wrapper grey-color">
          <div className="banner-content">
            <h2>Discover our Plants</h2>
            <p>
              Plants are nature's healers. They teach us resilience, as they
              adapt and thrive in diverse environments. In their presence, we
              find a profound connection to the Earth and a reminder of our
              responsibility to nurture and protect the source of our
              well-being.
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "98%", height: 430 }}>
        {foundPlant && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <img
                className="details-img"
                src={foundPlant.image}
                alt="Plant image"
              />
            </div>
            <div className="details-content">
              <h1 style={{ margin: "20px 0" }}>{foundPlant.name}</h1>
              <div style={{ margin: "20px 0" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={toggleMyPlants}
                >
                  {isInMyPlants ? "Remove from My Plants" : " Add to My Plants"}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={toggleWishList}
                  sx={{ marginLeft: "20px" }}
                >
                  {isInWishList
                    ? "Remove from Wishlist"
                    : " Add to My Wishlist"}
                </Button>
              </div>
              <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Care Tips</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabPanel value={0}>
                  <div>
                    <p>{foundPlant.description}</p>
                    <br />
                    <div className="plant-details-content">
                      <div className="plant-characteristics">
                        <h4>
                          <WaterDropIcon /> Watering
                        </h4>
                        <p> {foundPlant.care.watering} </p>
                      </div>
                      <div className="plant-characteristics">
                        <h4>
                          <LightModeIcon /> Sunlight
                        </h4>
                        <p>{foundPlant.care.light}</p>
                      </div>
                      <div className="plant-characteristics">
                        <h4>
                          <CleaningServicesIcon /> Soil
                        </h4>
                        <p>{foundPlant.care.soil}</p>
                      </div>
                      <div className="plant-characteristics">
                        <h4>
                          <PetsIcon /> Toxicity:
                        </h4>
                        <p>{foundPlant.toxicity}</p>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={1}>
                  <p>{foundPlant.tips}</p>
                </TabPanel>
                <TabPanel value={2}>
                  <div>
                    {foundPlant.reviews.map((review) => {
                      return (
                        <div
                          key={review._id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            webkitBoxShadow:
                              "2px 2px 9px -4px rgba(51,51,51,1)",
                            mozBoxShadow: "2px 2px 9px -4px rgba(51,51,51,1)",
                            boxShadow: "2px 2px 9px -4px rgba(51,51,51,1)",
                            padding: "20px",
                            margin: "20px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <IconButton>
                                <AccountCircleIcon
                                  sx={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                ></AccountCircleIcon>
                              </IconButton>
                              {review.author.name}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "3",
                                fontSize: "1.3rem",
                              }}
                            >
                              <h4>{review.rating} </h4>

                              <StarIcon />
                            </div>
                          </div>

                          <div style={{ width: "100%", textAlign: "justify" }}>
                            <p>{review.content}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <div>
                              {user.reviews.includes(review._id) && (
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => deleteReview(review._id)}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ margin: "20px" }}>
                    <form onSubmit={handleSubmitAddReview}>
                      <textarea
                        name="content"
                        type="text"
                        value={content}
                        placeholder="Write your review"
                        onChange={(e) => setContent(e.target.value)}
                        cols="50"
                        rows="7"
                        style={{
                          padding: "15px",
                          fontFamily: "monserat",
                          fontSize: "1.1rem",
                        }}
                      ></textarea>

                      <br />

                      <label>
                        Classify {foundPlant.name}
                        <Stack spacing={1} sx={{ margin: "10px 0 20px 0" }}>
                          <Rating
                            name="half-rating"
                            defaultValue={5.0}
                            precision={1.0}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          />
                        </Stack>
                      </label>

                      <Button color="primary" type="submit" variant="contained">
                        Create Review
                      </Button>
                    </form>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        )}
        <Link to={"/plants"}>Back</Link>
      </div>
    </div>
  );
}

export default PlantDetails;
