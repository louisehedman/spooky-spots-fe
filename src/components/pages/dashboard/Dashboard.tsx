import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
          role: res.data.user.role,
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
        <div className="container rounded mb-4 text-white" style={{backgroundColor: "#0e284a"}}>
            <h2>Hi {user?.username}!</h2>
            {user?.role === 0 && <p>You are signed in as user</p>}
            {user?.role === 1 && <p>You are signed in as admin</p>}
        </div>
    )
}

export default Dashboard;