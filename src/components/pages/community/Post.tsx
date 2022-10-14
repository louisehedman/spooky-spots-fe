import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../../../helpers/Urls";
import { IComment, IPost } from "../../../interfaces/Interfaces";
import { AuthContext } from "../../../auth/AuthProvider";

interface Props {
  post: IPost;
  threadId: string | undefined;
}

const Post: React.FC<Props> = ({ post }) => {
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState<IComment[]>([]);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState({
    content: "",
  });
  const postId = post._id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(API_URL(`posts/${postId}/comments`), {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        res.data as IComment[];
        setComments(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewComment({
      ...newComment,
      [e.target.name]: value,
    });
    console.log(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    e.preventDefault();
    try {
      let commentDetails = newComment;
      let res = await axios.post(url, commentDetails, {
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

  const deletePost = async (id: string | undefined) => {
    return axios
      .delete(API_URL(`posts/${id}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteComment = async (id: string | undefined) => {
    return axios
      .delete(API_URL(`comments/${id}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li>
      <div className="card col-lg-6 col-md-8 m-auto text-black mb-2 ">
        <h3
          className="h4 card-header text-center text-white border-0"
          style={{ backgroundColor: "#0e284a" }}
        >
          {post.title}
        </h3>
        <p
          className="my-0 pb-2 text-white"
          style={{ backgroundColor: "#0e284a" }}
        >
          By: {post.username} at {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="card-body">{post.text}</p>
        <div>
          {(post.username === localStorage.getItem("username") ||
            auth?.admin) && (
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this post?")
                )
                  deletePost(post._id);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="text-white my-2">
        <button
          className={
            showComments === false
              ? "btn btn-success btn-sm"
              : "btn btn-warning text-black btn-sm"
          }
          style={{ color: "white" }}
          onClick={() => setShowComments((comments) => !comments)}
          id={post._id}
        >
          {showComments === false
            ? `Write and show comments (${comments.length})`
            : `Hide comments`}
        </button>
      </div>
      {showComments && (
        <ul className="list-unstyled mb-4">
          {comments.map((comment: IComment, index: any) => {
            return (
              <li
                className="card col-lg-4 col-md-6 m-auto text-black"
                key={index}
              >
                <p
                  className="card-header text-white"
                  style={{ backgroundColor: "#0e284a" }}
                >
                  By: {comment.username} at{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p className="card-body">{comment.content}</p>
                <div>
                  {(comment.username === localStorage.getItem("username") ||
                    auth?.admin) && (
                    <button
                      className="btn btn-danger btn-sm float-end"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this comment?"
                          )
                        )
                          deleteComment(comment._id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {showComments && (
        <div className="card text-white" style={{ backgroundColor: "#0e284a" }}>
          <form
            className="text-center"
            onSubmit={(e) =>
              handleSubmit(e, API_URL(`posts/${post?._id}/comments`))
            }
          >
            <div className="form-group my-4">
              <div className="form-group my-4">
                <label htmlFor="content" className="d-block h6">New comment:</label>
                <textarea
                  className="col-lg-4 col-md-6 col-12"
                  id="content"
                  name="content"
                  placeholder="Write something..."
                  value={newComment.content}
                  maxLength={1000}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <input
                className="btn btn-success btn-sm btn-block"
                type="submit"
                value="Create comment"
              />
            </div>
          </form>
        </div>
      )}
    </li>
  );
};

export default Post;
