import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../helpers/Urls";
import { IUserDetails } from "../../../interfaces/Interfaces";

const RegisterForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState<IUserDetails>({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  // Sets focus on the username field when component mounts
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

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
      setMessage(`Registration successful`);
    } catch (err: any) {
      // Errors from mongoose uniqueValidator plugin
      if (err.response.data.includes("User validation failed: email")) {
        setMessage("Account already registered with this email");
      } else if (
        err.response.data.includes("User validation failed: username")
      ) {
        setMessage("Account already registered with this username");
      } else {
        setMessage(err.response.data);
      }
    }
  };
  return (
    <>
      <div className="my-5">
        <h2 className="text-center">Register</h2>
        <p
          ref={messageRef}
          className="text-reset text-center"
          style={
            !message ? { visibility: "hidden" } : { visibility: "visible" }
          }
        >
          {message}
        </p>
        <form
          className="w-75 m-auto"
          onSubmit={(e) => handleSubmit(e, API_URL("register"))}
        >
          <div className="form-group">
            <label>Username: </label>
            <input
              ref={usernameRef}
              className="form-control m-auto my-3"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <label>Email: </label>
            <input
              ref={emailRef}
              className="form-control m-auto my-3"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <label>Password: </label>
            <input
              ref={passwordRef}
              className="form-control m-auto my-3"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input className="btn btn-success" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;