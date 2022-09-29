import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const HandleUsers: React.FC = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState<IUser[]>([]);

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
    <div className="container rounded py-5 my-5 text-white" style={{ backgroundColor: "#0e284a" }}>
      <div className="row justify-content-center">
                <div className="col-md-8">

       <div className="card-header">
                <h2>Handle users
                    <Link to="/dashboard" className="btn btn-dark float-end mb-2">BACK</Link>
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
                    {user.role === 0 && <td>User</td>}
                    {user.role === 1 && <td>Admin</td>}
                    <td><Link className="btn btn-warning btn-sm" to="edit-user">Edit user</Link></td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user._id)}
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
    </div>
    </div>
    </div>
  );
};

export default HandleUsers;
