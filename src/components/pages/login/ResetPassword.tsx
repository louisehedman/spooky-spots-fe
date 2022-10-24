import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState({
    password: "",
  });
  // Disable submit if password and confirmation do not match
  const [isDisabled, setIsDisabled] = useState(true);
  
  let { slug } = useParams();
  let passwordConfirm;

  const navigate = useNavigate();

  // Sets focus on the password field when component mounts
  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
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
      const res = await axios.put(
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
      setMessage(`Password reset successful`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      setMessage(`Invalid reset token or server error`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h2
              className="card-header text-center text-white"
              style={{ backgroundColor: "#0e284a" }}
            >
              Reset password
            </h2>

            <p
              ref={messageRef}
              className="text-reset text-center"
              style={
                !message ? { visibility: "hidden" } : { visibility: "visible" }
              }
            >
              {message}
            </p>
            {loading && <p className="text-center">Loading...</p>}
            <div className="card-body">
              <form
                className="w-75 m-auto"
                onSubmit={(e) =>
                  handleSubmit(e, API_URL(`resetpassword/${slug}`))
                }
              >
                <div className="form-group">
                  <label htmlFor="password">Choose new password: </label>
                  <input
                    ref={passwordRef}
                    className="form-control m-auto my-3"
                    id="password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="New password"
                    required
                  />
                  <label htmlFor="passwordConfirm">
                    Confirm new password:{" "}
                  </label>
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
                    disabled={isDisabled}
                    type="submit"
                    value="Reset my password"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
