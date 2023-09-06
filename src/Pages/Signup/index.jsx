import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const API_URL = 'https://botanicalhack.onrender.com';

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevent default actions
    e.preventDefault();

    // create our request body object
    const requestBody = { name, email, password };

    // We send these infos to Backend
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      style={{
        height: "92vh",
        backgroundImage: "url(/images/SignupPage.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "1px",
        }}
      >
        <div
          style={{
            background: "rgba(51, 51, 51, 0.90)",
            color: "white",
            width: "100%",
            padding: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ p: "10px", m: "30px 0 10px", bgcolor: "#227A60" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                name="name"
                label="Name"
                type="text"
                id="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "100%", color: "white" }}
              />

              <TextField
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: "100%", color: "white" }}
              />
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: "100%", color: "white" }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#227A60" }}
              >
                Sign up
              </Button>
              {errorMessage && <p>{errorMessage}</p>}
              <Typography variant="body1">
                {"Already have an account?"}{" "}
                <Link to={"/login"} style={{ color: "#227A60" }}>
                  {" "}
                  Log in
                </Link>
              </Typography>
            </Box>
          </Box>
        </div>
      </Container>
    </div>
  );
}
export default SignupPage;
// <div className="signupPage">
//   <h1>Sign Up</h1>
//   <form onSubmit={handleSubmit}>
//     <label>
//       Email:
//       <input
//         type="email"
//         name="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </label>
//     <label>
//       Password:
//       <input
//         type="password"
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </label>
//     <label>
//       Name:
//       <input
//         type="text"
//         name="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </label>
//     <button type="submit">Sign Up</button>
//     {errorMessage && <p>errorMessage</p>}
//   </form>
// </div>
