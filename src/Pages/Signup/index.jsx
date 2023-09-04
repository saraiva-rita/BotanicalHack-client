import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function SignupPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signupPage">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
        {errorMessage && <p>errorMessage</p>}
      </form>
    </div>
  );
}
export default SignupPage;
