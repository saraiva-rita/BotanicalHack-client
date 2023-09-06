import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function PlantDetails() {
  const [foundPlant, setfoundPlant] = useState(null);

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);

  const [shouldGetPlant, setShouldGetPlant] = useState(true);

  const [user, setUser] = useState(null);
  const [shouldGetUser, setShouldGetUser] = useState(true);

  const API_URL = 'http://localhost:5005';

  const { plantId } = useParams();

  const storedToken = localStorage.getItem('authToken');

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

  // Add Plants to MyPlants
  const addMyPlants = () => {
    axios
      .post(`${API_URL}/api/plants/${plantId}/addMyPlants`, '', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShouldGetPlant(true);
      })
      .catch((error) => console.log(error));
  };

  // Add Plants to Wish List
  const addWishList = () => {
    axios
      .post(`${API_URL}/api/plants/${plantId}/addToWishList`, '', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShouldGetPlant(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="plants-details-banner"></div>
      <div style={{ width: '100%', height: 430 }}>
        {foundPlant && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
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
              <h1 style={{ margin: '20px 0' }}>{foundPlant.name}</h1>
              <div style={{ margin: '20px 0' }}>
                <button style={{ marginRight: '20px' }} onClick={addMyPlants}>
                  Add to My Plants
                </button>
                <button onClick={addWishList}>Add to My Wish List</button>
              </div>
              <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                  <Tab>Description</Tab>
                  <Tab>Care Tips</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabPanel value={0}>
                  <p>{foundPlant.description}</p>
                  <p>
                    <b>Watering:</b> {foundPlant.care.watering}
                  </p>
                  <p>
                    <b>Sunlight:</b> {foundPlant.care.light}
                  </p>
                  <p>
                    <b>Soil:</b> {foundPlant.care.soil}
                  </p>
                  <p>
                    <b>Toxicity:</b> {foundPlant.care.toxicity}
                  </p>
                </TabPanel>
                <TabPanel value={1}>
                  <p>{foundPlant.tips}</p>
                </TabPanel>
                <TabPanel value={2}>
                  <div>
                    {foundPlant.reviews.map((review) => {
                      return (
                        <div key={review._id}>
                          <p>{review.content}</p>
                          <p>{review.rating}</p>
                          <p>{review.author.name}</p>
                          <Tooltip title="Delete">
                            <IconButton>
                              {user.reviews.includes(review._id) && (
                                <button
                                  style={{
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                  }}
                                  onClick={() => deleteReview(review._id)}
                                >
                                  <DeleteIcon sx={{ color: 'grey.700' }} />
                                </button>
                              )}
                            </IconButton>
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmitAddReview}>
                    <h4>Write your review</h4>
                    <br />
                    <label>
                      Content:
                      <input
                        type="text"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </label>
                    <br />

                    <label>
                      Classify {foundPlant.name}
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating"
                          defaultValue={5.0}
                          precision={1.0}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        />
                      </Stack>
                    </label>
                    <button className="button" type="submit">
                      Create Review
                    </button>
                  </form>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        )}
        <Link to={'/plants'}>Back</Link>
      </div>
    </div>
  );
}

export default PlantDetails;
