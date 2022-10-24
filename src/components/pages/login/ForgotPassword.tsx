import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../../helpers/Urls";

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState({
    email: "",
  });

  // Sets focus on the email field when component mounts
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
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
      setMessage(`Email sent, check your mailbox`);
    } catch (err: any) {
      setLoading(false);
      setMessage(
        "Email couldn't be sent, make sure it's your registered email, or try again later"
      );
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
              Forgot password
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
                onSubmit={(e) => handleSubmit(e, API_URL("forgotpassword"))}
              >
                <div className="form-group">
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

                  <input
                    className="btn btn-success"
                    type="submit"
                    value="Send me reset-email"
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

export default ForgotPassword;
