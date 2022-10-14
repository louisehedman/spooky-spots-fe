import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import {
  ICommunitySubject,
  ICommunityThread,
} from "../../../interfaces/Interfaces";
import { AuthContext } from "../../../auth/AuthProvider";

const CommunitySubject: React.FC = () => {
  const auth = useContext(AuthContext);
  const [communitySubject, setCommunitySubject] = useState<ICommunitySubject>();
  const [threads, setThreads] = useState<ICommunityThread[]>([]);
  const [newThread, setNewThread] = useState({
    title: "",
  });
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.auth()) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchCommunitySubject = async () => {
      try {
        const res = await axios.get(API_URL(`communitySubjects/${slug}`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCommunitySubject(res.data.communitySubject);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunitySubject();
  }, [slug]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await axios.get(
          API_URL(`communitysubjects/${slug}/threads`),
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        res.data as ICommunityThread[];
        setThreads(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchThreads();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewThread({
      ...newThread,
      [e.target.name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    e.preventDefault();
    try {
      let threadDetails = newThread;
      let res = await axios.post(url, threadDetails, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("res: ", res);
      if (res.status === 200) {
        console.log(res);
        window.location.reload();
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container rounded mb-4 py-4 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center mb-4">
        {communitySubject?.title}{" "}
        <Link to="/community" className="btn btn-dark float-end mb-2">
          BACK
        </Link>
      </h2>
      <div className="card text-center" style={{ backgroundColor: "#0e284a" }}>
        <div className="card text-white" style={{ backgroundColor: "#0e284a" }}>
          <form
            className="text-center"
            onSubmit={(e) =>
              handleSubmit(
                e,
                API_URL(`communitysubjects/${communitySubject?._id}/threads`)
              )
            }
          >
            <div className="form-group my-4">
              <div className="form-group my-4">
                <label htmlFor="title" className="d-block h3">Create new thread:</label>
                <input
                  className="col-lg-4 col-md-6 col-12"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Name new thread"
                  value={newThread.title}
                  pattern="^[a-z|å|ä|ö|A-Z|Å|Ä|Ö|0-9_.!?, ]*$"
                  maxLength={60}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <input
                className="btn btn-success btn-sm btn-block"
                type="submit"
                value="Create thread"
              />
            </div>
          </form>
        </div>
        <ul className="list-unstyled">
          {threads.map((thread: ICommunityThread, index: any) => {
            return (
              <li
                className="card col-lg-6 col-md-8 m-auto text-black mb-2"
                key={index}
              >
                <h3 className="h4 card-header">{thread.title}</h3>
                <p>
                  Started by: {thread.username} at{" "}
                  {new Date(thread.createdAt).toLocaleDateString()}{" "}
                </p>
                <Link
                  className="btn btn-success btn-sm w-50 m-auto mb-2"
                  to={"threads/" + thread._id}
                >
                  Open thread
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CommunitySubject;
