import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, IconButton, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SaveIcon from "@mui/icons-material/Save";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfilePage() {
  const API_URL = 'https://botanicalhack.onrender.com';
  //const API_URL = "http://localhost:5005";
  const storedToken = localStorage.getItem("authToken");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [shouldGetUser, setShouldGetUser] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);

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
        setIsEditingName(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "92vh",
        backgroundImage: "url(/images/ProfilePage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "600px",
          height: "500px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          component="h5"
          sx={{ textAlign: "center", margin: "25px 0" }}
        >
          🪴 Hi Gardener 🪴
        </Typography>

        <hr />

        {user && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                className="user-info"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  margin: "15px 0",
                }}
              >
                <div className="user-info-icon">
                  <IconButton>
                    <AccountCircleIcon
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    ></AccountCircleIcon>
                  </IconButton>
                </div>

                <div
                  className="user-info-name-email"
                  style={{ marginLeft: "20px" }}
                >
                  {!isEditingName ? (
                    <Typography variant="h5" component="h6">
                      {user.name}
                    </Typography>
                  ) : (
                    <TextField
                      variant="standard"
                      onChange={(e) => setName(e.target.value)}
                    ></TextField>
                  )}

                  <Typography>{user.email}</Typography>
                </div>
              </div>
              {!isEditingName ? (
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CreateIcon />}
                  onClick={() => setIsEditingName(true)}
                >
                  Edit
                </Button>
              ) : (
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>

            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  height: "30px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  margin: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <p>My Reviews</p>
                <p>{user.reviews.length} Reviews</p>
              </Box>

              <Box
                sx={{
                  width: "90%",
                  height: "30px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  margin: "15px",
                }}
              >
                <Link
                  to={"/myPlants"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p>My Plants </p>
                </Link>
                <p>{user.myPlants.length} 🌿</p>
              </Box>

              <Box
                sx={{
                  width: "90%",
                  height: "30px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  margin: "20px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Link
                  to={"/wishList"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p>Whishlist </p>
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
