import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ICommunitySubject } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";

const Community: React.FC = () => {
  const auth = useContext(AuthContext);
  const [communitySubjects, setCommunitySubjects] = useState<ICommunitySubject[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.auth()) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchCommunitySubjects = async () => {
      try {
        const res = await axios.get(API_URL("communitysubjects"), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCommunitySubjects(res.data.communitySubjects);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunitySubjects();
  }, []);

  return (
    <div
      className="container rounded mb-4 text-white text-center my-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">
        SpookySpots Community <i className="fa-solid fa-ghost" />
      </h2>
      <div className="card" style={{ backgroundColor: "#0e284a" }}>
        <h3 className="text-center mb-4">Topics</h3>
        <ul className="list-unstyled">
          {communitySubjects.map((communitySubject: any, index: any) => {
            return (
              <li
                className="card col-lg-8 col-md-10 m-auto text-black mb-2"
                key={index}
              >
                <h4 className="card-header">{communitySubject.title}</h4>
                <p className="card-body">{communitySubject.description}</p>
                <Link
                  className="btn btn-success btn-sm w-75 m-auto mb-2"
                  to={"subjects/" + communitySubject._id}
                >
                  Go to {communitySubject.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Community;
