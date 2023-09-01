import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PlantDetails() {
  const [foundPlant, setfoundPlant] = useState(null);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);

  const [shouldGetPlant, setShouldGetPlant] = useState(true);

  const API_URL = "http://localhost:5005";

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
      })
      .catch((error) => console.log(error));
  };

  // Delete

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

  return (
    <div>
      {foundPlant && (
        <div>
          <h1>{foundPlant.name}</h1>
          <p>{foundPlant.description}</p>
          <img src={"/images/allPlants.jpg"} alt="Plant image" />
          <p>{foundPlant.tips}</p>

          <div>
            {foundPlant.reviews.map((review) => {
              return (
                <div key={review._id}>
                  <p>{review.content}</p>
                  <p>{review.rating}</p>
                  <p>{review.author.name}</p>
                  <button onClick={() => deleteReview(review._id)}>
                    Delete
                  </button>
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

      <Link to={"/plants"}>Back</Link>
    </div>
  );
}

export default PlantDetails;
