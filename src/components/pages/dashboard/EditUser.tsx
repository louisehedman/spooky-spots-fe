import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IEditUser, IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../../auth/AuthProvider";

const EditUser: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<IUser>();
  const [state, setState] = useState<IEditUser>({
    isAdmin: user?.isAdmin,
    email: user?.email,
  });
  const [message, setMessage] = useState("");
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.admin) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(API_URL(`users/${slug}`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUser(res.data.user);
        setState({ isAdmin: res.data.user.isAdmin });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [slug]);

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
      let res = await axios.put(
        url,
        { ...state },
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMessage(`${user?.username} updated`);
      console.log("res: ", res);
    } catch (err: any) {
      if (err.response.status === 401) {
        console.log(err);
      }
    }
  };

  return (
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
            Edit {user?.username}
            <Link
              to="/dashboard/handleusers"
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
            onSubmit={(e) => handleSubmit(e, API_URL("users/" + user?._id))}
          >
            <div className="form-group text-white">
              <p className="d-block">Is admin?</p>
              <label htmlFor="isUser">
                No
                <input
                  className="form-check-input text-secondary ms-2 me-4 my-4"
                  id="isUser"
                  type="radio"
                  name="isAdmin"
                  checked={false === state.isAdmin}
                  value="false"
                  onChange={(e) => {
                    handleChange(e, false);
                  }}
                />
              </label>
              <label htmlFor="isAdmin">
                Yes
                <input
                  className="form-check-input ms-2 me-4 my-4"
                  id="isAdmin"
                  type="radio"
                  name="isAdmin"
                  checked={true === state.isAdmin}
                  value="true"
                  onChange={(e) => {
                    handleChange(e, true);
                  }}
                />
              </label>
              <div className="form-group">
                <label className="col-form-label">
                  Email:{" "}
                  <input
                    type="text"
                    placeholder={user?.email}
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <input className="btn btn-success" type="submit" value="Edit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
