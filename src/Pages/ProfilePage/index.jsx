import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProfilePage() {
  // const API_URL = 'https://botanicalhack.onrender.com';
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
    <div
      style={{
        width: '100vw',
        height: '92vh',
        backgroundImage: 'url(/images/ProfilePage.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 500,
          height: 500,
          backgroundColor: '#e9f2ef',
        }}
      >
        <Typography
          variant="h3"
          component="h4"
          sx={{ textAlign: 'center', margin: '15px 0' }}
        >
          🪴 Hi Gardener 🪴
        </Typography>

        <hr />

        {user && (
          <div>
            <div
              className="user-info"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                margin: '15px 0',
              }}
            >
              <div className="user-info-icon">
                <IconButton>
                  <AccountCircleIcon
                    sx={{
                      width: '50px',
                      height: '50px',
                    }}
                  ></AccountCircleIcon>
                </IconButton>
              </div>

              <div className="user-info-name-email">
                <Typography variant="h5" component="h6">
                  {user.name}
                </Typography>

                <Typography>{user.email}</Typography>
              </div>
            </div>

            <hr />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: '90%',
                  height: '30px',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  margin: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <p>My Reviews</p>
                <p>{user.reviews.length} </p>
              </Box>

              <Box
                sx={{
                  width: '90%',
                  height: '30px',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  margin: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Link to={'/myPlants'}>
                  <p>My Plants </p>
                </Link>
                <p>{user.myPlants.length} 🌿</p>
              </Box>

              <Box
                sx={{
                  width: '90%',
                  height: '30px',
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  margin: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                }}
              >
                <Link to={'/wishList'}>
                  <p>Whislist </p>
                </Link>
                <p>{user.wishList.length} 🌿</p>
              </Box>
            </div>
          </div>
        )}

        <div></div>
      </Box>
    </div>

    // <div className="profilePage">
    //   {user && (
    //     <div>
    //       <h3>{user.name}</h3>
    //       <form>
    //         <label>
    //           Name:
    //           <input
    //             type="text"
    //             name="name"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //           />
    //         </label>
    //       </form>
    //       <button onClick={handleSubmit}>Edit Name</button>
    //       <p>{user.email}</p>
    //       <p>My Reviews #{user.reviews.length}</p>
    //       <p>My Plants #{user.myPlants.length}</p>
    //       <p>WishList #{user.wishList.length}</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default ProfilePage;
