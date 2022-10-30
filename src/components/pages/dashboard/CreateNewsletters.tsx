import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProvider";
import { API_URL } from "../../../helpers/Urls";
import { ISubscriber } from "../../../interfaces/Interfaces";

const CreateNewsletter: React.FC = () => {
  const auth = useContext(AuthContext);
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const [message, setMessage] = useState("");
  const [newNewsletter, setNewNewsletter] = useState({
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.admin) {
      navigate("/login");
    }
  });

  // Get all emails in subscription list
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get(API_URL("subscriptionlist"), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setSubscribers(res.data.subscribers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscribers();
  }, []);

  // Handles changes in inputs and updates credentials on each keypress
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setNewNewsletter({
      ...newNewsletter,
      /* Event targets use the same name as credentials object properties.
       * Sets the value of the current input to responding credentials property
       */
      [e.target.name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    // Prevents reloading of page on submit
    e.preventDefault();

    try {
      const res = await axios.post(
        url,
        { ...newNewsletter },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      setMessage(`Newsletter sent and saved successfully`);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err: any) {
      setMessage(err.response.data);
    }
  };

  return (
    <div
      className="container rounded py-5 my-5 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-header">
            <h2>
              Create newsletters
              <Link to="/dashboard" className="btn btn-dark float-end mb-2">
                BACK
              </Link>
            </h2>
          </div>
          <div className="d-flex row justify-content-between">
            <div className="container py-2 my-2">
              <div className="card text-black">
                <h3 className="h4 px-2">Subscribers:</h3>
                <p className="px-2">
                  {subscribers.map((subscriber: ISubscriber, index: any) => {
                    return <span key={index}>{subscriber.email}, </span>;
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="card" style={{ color: "#0e284a" }}>
            <h3
              className="card-header text-center text-white"
              style={{ backgroundColor: "#0e284a" }}
            >
              Create new newsletter
            </h3>
            <p
              ref={messageRef}
              className="text-reset text-center text-danger"
              style={
                !message ? { visibility: "hidden" } : { visibility: "visible" }
              }
            >
              {message}
            </p>
            <div className="card-body">
              <form
                className="w-75 m-auto"
                onSubmit={(e) => handleSubmit(e, API_URL("newsletters"))}
              >
                <div className="form-group">
                  <label htmlFor="subject" className="h6">
                    Choose a subject:{" "}
                  </label>
                  <input
                    className="form-control m-auto mb-3"
                    id="subject"
                    type="text"
                    name="subject"
                    value={newNewsletter.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                  <div className="form-group">
                    <label htmlFor="message" className="d-block h6">
                      Message, HTML format:
                    </label>
                    <textarea
                      className="col-12"
                      id="message"
                      name="message"
                      placeholder="Write something..."
                      value={newNewsletter.message}
                      maxLength={2000}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    className="btn btn-success my-2"
                    type="submit"
                    value="Send newsletter"
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

export default CreateNewsletter;
