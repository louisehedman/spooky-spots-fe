import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IEditSettings, IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const ManageSettings: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<IUser>();
  const [state, setState] = useState<IEditSettings>({
    email: user?.email,
    password: user?.password,
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.auth()) {
      navigate("/");
    }

    const getUser = async () => {
      try {
        const res = await axios.get(API_URL("user"), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUser({
          _id: res.data.user._id,
          username: res.data.user.username,
          avatar: res.data.user.avatar,
          password: res.data.user.password,
          email: res.data.user.email,
          isAdmin: res.data.user.isAdmin,
          spookySpotList: res.data.user.spookySpotList,
        });
      } catch (err: any) {
        if (err.response.status === 403) {
          auth?.handleLogout();
          navigate("/login");
        } else {
          navigate("/");
        }
      }
    };

    getUser();
  }, [auth, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
    console.log(value);
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
      setMessage("Your settings are updated");
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
            Edit email and password
            <Link to="/dashboard" className="btn btn-dark float-end mb-2">
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
            onSubmit={(e) => handleSubmit(e, API_URL("user/change_email"))}
          >
            <div className="form-group text-white">
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
              <div className="d-flex justify-content-center">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Edit Email"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
