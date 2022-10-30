import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import {
  IEditListItem,
  ISpookySpotListItem,
} from "../../../interfaces/Interfaces";
import { AuthContext } from "../../../auth/AuthProvider";

export interface Props {
  userId: string | undefined;
}

const EditListItem: React.FC = () => {
  // Use the variables and functions from the AuthContext
  const auth = useContext(AuthContext);
  const [listItem, setListItem] = useState<ISpookySpotListItem>();
  const [state, setState] = useState<IEditListItem>({
    comment: "",
    hasVisited: false,
  });

  const [message, setMessage] = useState("");
  const { listItemId } = useParams();
  const { userId } = useParams();

  const navigate = useNavigate();

  // If not authorized navigate to login
  useEffect(() => {
    if (!auth?.auth()) {
      navigate("/login");
    }
  });

  useEffect(() => {
    // Get and set list item
    const fetchUser = async () => {
      try {
        const res = await axios.get(API_URL(`get-list/${listItemId}`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setListItem(res.data.listItem);
        setState({ hasVisited: res.data.listItem.hasVisited });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [listItemId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    boolValue?: boolean
  ) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: boolValue !== undefined ? boolValue : value,
    });
    console.log(value);
    console.log(boolValue);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    // Prevents reloading of page on submit
    e.preventDefault();

    try {
      let res = await axios.patch(
        url,
        { ...state },
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMessage(`Listitem updated`);
      console.log("res: ", res);
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div
        className="container rounded my-4 mb-4 text-white"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div
          className="card border-0 col-lg-6 col-md-8 m-auto"
          style={{ backgroundColor: "#0e284a" }}
        >
          <div className="card-header">
            <h2>
              Edit listitem
              <Link
                to="/dashboard/spookyspotlist"
                className="btn btn-dark float-end mb-2"
              >
                BACK
              </Link>
            </h2>
          </div>
          <div className="card-body">
            <p
              className="text-reset text-center"
              style={
                !message ? { visibility: "hidden" } : { visibility: "visible" }
              }
            >
              {message}
            </p>
            <form
              className="text-white text-center"
              onSubmit={(e) =>
                handleSubmit(
                  e,
                  API_URL(
                    `edit-list-item/${userId}/${listItem?._id}`
                  )
                )
              }
            >
              <div className="form-group  my-4">
              <fieldset>
                <legend className="d-block h5">Have you visited?</legend>
                <label htmlFor="hasNotVisited">No:</label>
                <input
                  className="ms-2 me-4"
                  type="radio"
                  id="hasNotVisited"
                  name="hasVisited"
                  checked={false === state.hasVisited}
                  value="false"
                  onChange={(e) => {
                    handleChange(e, false);
                  }}
                />
                <label htmlFor="hasVisited">Yes</label>
                <input
                  className="ms-2 me-4"
                  type="radio"
                  id="hasVisited"
                  name="hasVisited"
                  checked={true === state.hasVisited}
                  value="true"
                  onChange={(e) => {
                    handleChange(e, true);
                  }}
                />
                </fieldset>
                <div className="form-group my-4">
                  <label htmlFor="comment" className="d-block h5">Comment:</label>
                  <textarea
                    id="comment"
                    name="comment"
                    placeholder={listItem?.comment}
                    value={state.comment}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <input
                  className="btn btn-success btn-block"
                  type="submit"
                  value="Edit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditListItem;
