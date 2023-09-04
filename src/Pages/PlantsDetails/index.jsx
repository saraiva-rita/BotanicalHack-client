import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function PlantDetails() {
  const [foundPlant, setfoundPlant] = useState(null);

  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);

  const [shouldGetPlant, setShouldGetPlant] = useState(true);

  const [user, setUser] = useState(null);

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
      })
      .catch((error) => console.log(error));
  };

  // Delete Review

  const deleteReview = (reviewId) => {
    axios
      .delete(`${API_URL}/api/plants/${plantId}/${reviewId}/deleteReview`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShouldGetPlant(true);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneUser = response.data;
        setUser(oneUser);
      })
      .catch((error) => console.log(error));
  }, [storedToken]);

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
      <div>
        {foundPlant && (
          <div>
            <h1>{foundPlant.name}</h1>
            <button onClick={addMyPlants}>Add to My Plants</button>
            <button onClick={addWishList}>Add to My Wish List</button>
            <img src={foundPlant.image} alt="Plant image" />
            <p>{foundPlant.description}</p>
            <p>{foundPlant.tips}</p>

            <div>
              {foundPlant.reviews.map((review) => {
                return (
                  <div key={review._id}>
                    <p>{review.content}</p>
                    <p>{review.rating}</p>
                    <p>{review.author.name}</p>
                    {user.reviews.includes(review._id) && (
                      <button onClick={() => deleteReview(review._id)}>
                        Delete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmitAddReview}>
              <label>
                Content:
                <input
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>

              <label>
                Rating:
                <input
                  type="number"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </label>

              <button type="submit">Create Review</button>
            </form>
          </div>
        )}
        <Link to={'/plants'}>Back</Link>
      </div>
    </div>
  );
}

export default PlantDetails;
