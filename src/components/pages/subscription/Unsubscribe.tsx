import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";

const Unsubscribe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const [message, setMessage] = useState("");
  let { slug } = useParams();

  // Unsubscribe from newsletter redirected from link in email
  const unsubscribe = async (email: string | undefined) => {
    setLoading(true);
    return axios
      .delete(API_URL(`subscriptionlist/${email}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setMessage("You have unsubscribed");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setMessage("Couldn't unsubscribe, try again later");
      });
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
              Unsubscribe from newsletter
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
            <div className="card-body text-center">
              <h3 className="h6">Email to unsubscribe:</h3>
              <p className="h6 pb-2">{slug}</p>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  if (window.confirm("Are you sure you wish to unsubscribe?"))
                    unsubscribe(slug);
                }}
              >
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
