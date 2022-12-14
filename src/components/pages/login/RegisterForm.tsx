import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IUserDetails } from "../../../interfaces/Interfaces";

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState<IUserDetails>({
    username: "",
    email: "",
    password: "",
  });

  // Disable submit if password and confirmation do not match
  const [isDisabled, setIsDisabled] = useState(true);

  let passwordConfirm;

  const navigate = useNavigate();

  // Sets focus on the username field when component mounts
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  // Handles changes in inputs and updates credentials on each keypress
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === "passwordConfirm") {
      e.target.value === credentials.password && e.target.value !== ""
        ? setIsDisabled(false)
        : setIsDisabled(true);
    }
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
    // Set message instead of default validation error from server
    if (credentials.password?.length) {
      if (credentials.password.length < 8) {
        // Refocus the password field
        if (passwordRef.current) {
          passwordRef.current.focus();
        }
        setCredentials({ ...credentials, password: "" });
        return setMessage("Password must be at least 8 characters");
      }
    }

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
      console.log(res);
      setLoading(false);
      setMessage(`Registration successful`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      // Errors from mongoose uniqueValidator plugin
      if (err.response.data.includes("User validation failed: email")) {
        setMessage("Account already registered with this email");
      } else if (
        err.response.data.includes("User validation failed: username")
      ) {
        setMessage("Account already registered with this username");
      } else {
        setMessage(err.response.data || `Server error`);
      }
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
                Register
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
                  onSubmit={(e) => handleSubmit(e, API_URL("register"))}
                >
                  <div className="form-group">
                    <label htmlFor="username">Choose username: </label>
                    <input
                      ref={usernameRef}
                      className="form-control m-auto my-3"
                      id="username"
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Username"
                      required
                    />
                    <label htmlFor="email">Email: </label>
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
                    <label htmlFor="password">Password: </label>
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
                    <label htmlFor="passwordConfirm">Confirm password: </label>
                    <input
                      className="form-control m-auto my-3"
                      id="passwordConfirm"
                      type="password"
                      name="passwordConfirm"
                      value={passwordConfirm}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      required
                    />
                    <input
                      className="btn btn-success"
                      type="submit"
                      disabled={isDisabled}
                      value="Register"
                    />
                  </div>
                </form>
                <p className="text-center pt-3">
                  Already have an account? Go to{" "}
                  <Link to="/login">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
