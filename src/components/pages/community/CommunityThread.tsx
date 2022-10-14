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
  const [newPost, setNewPost] = useState({
    title: "",
    text: "",
  });
  const { threadId } = useParams();
  const formatedThreadDate = useMemo(
    () => new Date(thread?.createdAt as any).toLocaleString(),
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setNewPost({
      ...newPost,
      [e.target.name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    e.preventDefault();
    try {
      let postDetails = newPost;
      let res = await axios.post(url, postDetails, {
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
        <div className="card text-white" style={{ backgroundColor: "#0e284a" }}>
          <h3>Write a post</h3>
          <form
            className="text-center"
            onSubmit={(e) =>
              handleSubmit(e, API_URL(`communitythreads/${thread?._id}/posts`))
            }
          >
            <div className="form-group my-4">
              <div className="form-group my-4">
                <label htmlFor="title" className="d-block h4">Title:</label>
                <input
                  className="col-lg-6 col-md-8 col-12"
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Post title"
                  value={newPost.title}
                  pattern="^[a-z|å|ä|ö|A-Z|Å|Ä|Ö|0-9_.!?, ]*$"
                  maxLength={100}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label htmlFor="text" className="d-block h4 mt-2">Post content:</label>
                <textarea
                  className="col-lg-6 col-md-8 col-12"
                  id="text"
                  name="text"
                  placeholder="Write something..."
                  value={newPost.text}
                  maxLength={2000}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <input
                className="btn btn-success btn-sm btn-block"
                type="submit"
                value="Create post"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityThread;
