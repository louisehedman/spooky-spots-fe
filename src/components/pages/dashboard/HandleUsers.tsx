import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div
      className="container rounded mb-4 my-5"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <section className="table-responsive">
        <div className="card-body text-center">
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
                    <td>Update</td>
                    <td>
                      <button
                        className="btn btn-danger"
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
  );
};

export default HandleUsers;
