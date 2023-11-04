import "./SignIn.css"
import bannerImg from "../images/SignInBanner.png"
import backgroundImg from "../images/SignUpBackground.png"
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [unknownError, setUnknownError] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const history=useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {email: email, password: password, rememberMe: rememberMe};
    console.log(JSON.stringify(user));

      try {
        fetch('http://localhost:3100/signin', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(user)
        })
        .then(response => {
          if (!response.ok) {
            return response.json();
          }
          return response.json();

        })
        .then(data => {
          const message = data.message;
          if (message === "Invalid input") {
            setInvalidInput(true);
          } else if (message === 'Internal Server Error') {
            setUnknownError(true);
          } else if (message === 'Invalid email or password') {
            setInvalid(true);
          } else if (message === "signed in") {
            //history.push('/home');
          }
        })
        .catch(error => {
          console.error('Fetch error:', error); // Log any fetch-related errors
          setUnknownError(true);
        });
      } catch (e) {
        setUnknownError(true);
      }

  }

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="style.css" />
        <title>Sign In</title>
      </head>
      <body style={{
        backgroundImage: `url(${backgroundImg})`, // Set background image
        backgroundSize: 'cover', // Stretch to cover the whole screen
        backgroundRepeat: 'no-repeat', // Prevent image repetition
        backgroundAttachment: 'fixed', // Keep the image fixed while scrolling
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
      }}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row border rounded-5 p-3 bg-white shadow box-area">
            <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div class="featured-image mb-3">
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                <img src={bannerImg} class="img-fluid imgBanner" alt = 'Sign Up Banner'/>
              </a>
            </div>
            </div>
            <div className="col-md-6 right-box">
              <div className="row align-items-center">
                <div className="header-text mb-4">
                  <h2>Hello, Again</h2>
                  <p>We are happy to have you back.</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <input
                      type="text"
                      className="form-control form-control-lg bg-light fs-6"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group mb-1">
                <input
                      type="password"
                      className="form-control form-control-lg bg-light fs-6"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                    <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                  </div>
                  <div className="forgot">
                    <small><a href="#">Forgot Password?</a></small>
                  </div>
                </div>
                {unknownError && (
                    <div className="alert alert-danger" role="alert">
                      Unkown error has occured. Please try again.
                    </div>
                  )}
                {invalid && (
                    <div className="alert alert-danger" role="alert">
                      Invalid email or password.
                    </div>
                  )}
                {invalidInput && (
                    <div className="alert alert-danger" role="alert">
                      Invalid input.
                    </div>
                  )}
                <div className="input-group mb-3">
                  <button className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                </div>
                </form>
                <div className="row">
                  <small>Don't have an account? <a href="/signup">Sign Up</a></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default SignIn;