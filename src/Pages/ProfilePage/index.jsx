import axios from 'axios';
import { useState, useEffect } from 'react';

function ProfilePage() {
  const API_URL = 'http://localhost:5005';
  const storedToken = localStorage.getItem('authToken');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [shouldGetUser, setShouldGetUser] = useState(true);

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
  }, [shouldGetUser, storedToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name };
    axios
      .put(`${API_URL}/auth/profile/editName`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShouldGetUser(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="profilePage">
      {user && (
        <div>
          <h3>{user.name}</h3>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </form>
          <button onClick={handleSubmit}>Edit Name</button>
          <p>{user.email}</p>
          <p>My Reviews #{user.reviews.length}</p>
          <p>My Plants #{user.myPlants.length}</p>
          <p>WishList #{user.wishList.length}</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
