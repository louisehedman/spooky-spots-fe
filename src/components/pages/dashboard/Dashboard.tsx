import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState<IUser>();

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
          email: res.data.user.password,
          isAdmin: res.data.user.isAdmin,
          spookySpotList: res.data.user.spookySpotList
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

  return (
    <div
      className="container rounded mb-4 text-white my-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card" style={{ backgroundColor: "#0e284a" }}>
            <div className="card-header">
              <h2>Hi {user?.username}!</h2>
            </div>
            <h4 className="card-title dashboard-title">
              Welcome to your dashboard
            </h4>
            {auth?.admin && (
              <h5 className="card-subtitle">You are signed in as admin</h5>
            )}
            <div className="card-body">
              <h5 className="card-title">Here you can:</h5>

              <ul className="list-group list-group-flush">
                {auth?.admin && (
                  <li className="list-group-item h5">
                    <Link className="link-dark" to="handleusers">
                      Handle Users
                    </Link>
                  </li>
                )}
                <li className="list-group-item h5">
                  <a className="link-dark" href="/mylists">
                    Handle your saved spooky spots
                  </a>
                </li>
                <li className="list-group-item h5">
                  <a className="link-dark" href="/usersettings">
                    Manage your settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
