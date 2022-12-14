import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { IUserDetails } from "../../../interfaces/Interfaces";
import { API_URL } from "../../../helpers/Urls";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  // Use the variables and functions from the AuthContext
  const auth = useContext(AuthContext);
  // References to input elements
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // Reference to p displaying validation messages
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState<IUserDetails>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Sets focus on the email field when component mounts
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Clears the error message when correcting email
  useEffect(() => {
    setMessage("");
  }, [credentials.email]);

  // Handles changes in inputs and updates credentials on each keypress
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      /* Event targets use the same name as credentials object properties.
       * Sets the value of the current input to responding credentials property
       */
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    // Prevents reloading of page on submit
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        url,
        { ...credentials },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      // Clears the password field on submit
      setCredentials({ ...credentials, password: "" });
      // Sets the context username and role to the username and role from response and sets context signedIn variable to true
      auth?.handleLogin(res.data.username, res.data.isAdmin);
      setMessage(`Welcome ${res.data.username}`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      // If password is invalid
      if (err.response.status === 401) {
        if (passwordRef.current) {
          // Clear the password field and refocus password input
          setCredentials({ ...credentials, password: "" });
          passwordRef.current.focus();
        }
      }
      // If email is invalid
      else if (emailRef.current) {
        // Clear the password field and focus email input
        setCredentials({ ...credentials, password: "" });
        emailRef.current.focus();
      }
      // Set message to error response message
      setMessage(err.response.data || `Server error`);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <h2
                className="card-header text-center text-white"
                style={{ backgroundColor: "#0e284a" }}
              >
                Sign in
              </h2>
              <p
                ref={messageRef}
                className="text-reset text-center"
                style={
                  !message
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
              >
                {message}
              </p>
              {loading && <p className="text-center">Loading...</p>}
              <div className="card-body">
                <form
                  className="w-75 m-auto"
                  onSubmit={(e) => handleSubmit(e, API_URL("login"))}
                >
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      ref={emailRef}
                      className="form-control m-auto my-3"
                      id="email"
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                      ref={passwordRef}
                      className="form-control m-auto my-3"
                      id="password"
                      type="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                    <input
                      className="btn btn-success"
                      type="submit"
                      value="Login"
                    />
                  </div>
                </form>
                <p className="text-center pt-3">
                  Forgot your password?{" "}
                  <Link to="/forgotpassword">Click here</Link>
                </p>
                <p className="text-center pt-3">
                  No account yet? Go to <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
