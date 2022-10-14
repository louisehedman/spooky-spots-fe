import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ICreateUser, IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const HandleUsers: React.FC = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState<ICreateUser>({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.admin) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL("users"), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  // Handles changes in inputs and updates credentials on each keypress
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    boolValue?: boolean
  ) => {
    const value = e.target.value;
    setNewUser({
      ...newUser,
      /* Event targets use the same name as credentials object properties.
       * Sets the value of the current input to responding credentials property
       */
      [e.target.name]: boolValue !== undefined ? boolValue : value,
    });
    console.log(value);
    console.log(boolValue);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    // Prevents reloading of page on submit
    e.preventDefault();
    // Set message instead of default validation error from server
    if (newUser.password?.length) {
      if (newUser.password.length < 8) {
        setNewUser({ ...newUser, password: "" });
        return setMessage("Password must be at least 8 characters");
      }
    }

    try {
      const res = await axios.post(
        url,
        { ...newUser },
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      setMessage(`User created successfully`);
      window.location.reload();
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

  const deleteUser = async (id: string | undefined) => {
    if (auth?.admin) {
      return axios
        .delete(API_URL(`users/${id}`), {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
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
              Handle users
              <Link to="/dashboard" className="btn btn-dark float-end mb-2">
                BACK
              </Link>
            </h2>
          </div>
          <section className="" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="card-body text-center table-responsive">
              <table className="table table-hover" style={{ color: "#0e284a" }}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: IUser, index: any) => {
                    return (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {user.isAdmin === false && <td>User</td>}
                        {user.isAdmin === true && <td>Admin</td>}
                        <td>
                          <Link
                            className="btn btn-warning btn-sm"
                            to={"edituser/" + user._id}
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this user?"
                                )
                              )
                                deleteUser(user._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <div className="card" style={{ color: "#0e284a" }}>
            <h3
              className="card-header text-center text-white"
              style={{ backgroundColor: "#0e284a" }}
            >
              Create new user
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
                onSubmit={(e) => handleSubmit(e, API_URL("register"))}
              >
                <div className="form-group">
                  <label>Choose username: </label>
                  <input
                    className="form-control m-auto my-3"
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                  <label>Email: </label>
                  <input
                    className="form-control m-auto my-3"
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                  <label>Password: </label>
                  <input
                    className="form-control m-auto my-3"
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <div className="form-group">
                    <p className="d-block">Admin?</p>
                    <label htmlFor="isUser">
                      No
                      <input
                        className="form-check-input text-secondary ms-2 me-4 my-4"
                        type="radio"
                        name="isAdmin"
                        checked={false === newUser.isAdmin}
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
                        type="radio"
                        name="isAdmin"
                        checked={true === newUser.isAdmin}
                        value="true"
                        onChange={(e) => {
                          handleChange(e, true);
                        }}
                      />
                    </label>
                  </div>
                  <input
                    className="btn btn-success"
                    type="submit"
                    value="Create new user"
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

export default HandleUsers;
