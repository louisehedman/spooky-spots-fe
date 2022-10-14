import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpotListItem, IUser } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../../auth/AuthProvider";
import ListItem from "./ListItem";

const SpookySpotList: React.FC = () => {
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
          password: res.data.user.password,
          email: res.data.user.password,
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

  return (
    <div
      className="container rounded py-5 my-5 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card-header">
            <h2>
              {user?.spookySpotList === undefined ||
              user?.spookySpotList?.length === 0
                ? "You have no saved spooky spots yet"
                : "My saved spooky spots"}
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
                    <th>SpookySpot</th>
                    <th>Visited?</th>
                    <th>Comment</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.spookySpotList &&
                    user?.spookySpotList.map(
                      (listItem: ISpookySpotListItem, index: any) => (
                        <ListItem
                          key={index}
                          listItem={listItem}
                          userId={user?._id}
                        />
                      )
                    )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SpookySpotList;
