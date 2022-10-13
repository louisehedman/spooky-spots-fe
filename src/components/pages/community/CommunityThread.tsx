import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ICommunityThread, IPost } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../auth/AuthProvider";
import Post from "./Post";

const CommunityThread: React.FC = () => {
  const auth = useContext(AuthContext);
  const [thread, setThread] = useState<ICommunityThread>();
  const [posts, setPosts] = useState([]);
  const { threadId } = useParams();
  const formatedThreadDate = useMemo(
    () => new Date(thread?.createdAt as any).toLocaleDateString(),
    [thread?.createdAt]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.auth()) {
      navigate("/login");
    }
  });

  useEffect(() => {
    const fetchCommunityThread = async () => {
      try {
        const res = await axios.get(API_URL(`communitythreads/${threadId}`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        res.data as ICommunityThread;
        setThread(res.data.communityThread);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommunityThread();
  }, [threadId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          API_URL(`communitythreads/${threadId}/posts`),
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        res.data as IPost[];
        setPosts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [threadId]);

  return (
    <div
      className="container rounded mb-4 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="btn btn-dark float-end my-2"
      >
        BACK
      </button>
      <h2 className="text-center text-white mt-4 pt-4 my-2">
        {thread?.title}{" "}
      </h2>
      <p className="text-center mb-4">
        Thread started by: {thread?.username} at {formatedThreadDate}
      </p>
      <div className="card text-center" style={{ backgroundColor: "#0e284a" }}>
        <h3>Posts:</h3>
        <ul className="list-unstyled">
          {posts.map((post: IPost, index: any) => (
            <Post key={index} post={post} threadId={thread?._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityThread;
