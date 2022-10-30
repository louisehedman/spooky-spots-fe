import axios from "axios";
import { useRef, useState } from "react";
import { API_URL } from "../../../helpers/Urls";

const Subscribe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  // Message variable
  const [message, setMessage] = useState("");
  // User input variable
  const [credentials, setCredentials] = useState({
    email: "",
  });

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

  // Subscribe to newsletter
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
      setMessage(`Subscription successful`);
    } catch (err: any) {
      setLoading(false);
        setMessage(`Seems like your email already is subscribed, otherwise try later`);
    }
  };
  return (
    <div>
      <div className="card w-50 m-auto mt-3">
        <h2
          className="card-header text-center text-white"
          style={{ backgroundColor: "#0e284a" }}
        >
          Subscribe to newsletter!
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
            onSubmit={(e) => handleSubmit(e, API_URL("subscriptionlist"))}
          >
            <div className="form-group">
              <label htmlFor="email">Email to subscribe: </label>
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
                value="Subscribe"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
