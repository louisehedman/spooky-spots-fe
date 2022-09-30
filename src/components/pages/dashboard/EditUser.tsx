import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IEditUser, IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const EditUser: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<IUser>();
  const [state, setState] = useState<IEditUser>({
    role: 0,
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      setMessage(`${user?.username}'s role updated`)
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
      <div className="card border-0 col-lg-6 col-md-8 m-auto" style={{ backgroundColor: "#0e284a" }}>
      <div className="card-header">
        <h2>
          Edit {user?.username}'s role
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
                  !message
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
              >
                {message}
              </p>
        <form
          className=""
          onSubmit={(e) => handleSubmit(e, API_URL("users/" + user?._id))}
        >
          <div className="form-group">
            <div className="mb-3 row">
              <label htmlFor="role" className="col-sm-2 col-form-label">
                Role
              </label>
              <div className="col-sm-10">
                <select
                  id="role"
                  name="role"
                  value={state.role}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="form-select"
                >
                  <option value="0">Regular user</option>
                  <option value="1">Admin</option>
                </select>
              </div>
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
