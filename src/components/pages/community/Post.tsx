import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../helpers/Urls";
import { IComment, IPost } from "../../../interfaces/Interfaces";

interface Props {
  post: IPost;
  threadId: string | undefined;
}

const Post: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<IComment[]>([]);
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

  return (
    <li>
      <div className="card col-lg-6 col-md-8 m-auto text-black mb-2 ">
        <h3
          className="h4 card-header text-center text-white border-0"
          style={{ backgroundColor: "#0e284a" }}
        >
          {post.title}
        </h3>
        <p className="my-0 text-white" style={{ backgroundColor: "#0e284a" }}>
          By: {post.username} at {new Date(post.createdAt).toLocaleString()}
        </p>
        <p className="card-body">{post.text}</p>
      </div>
      <h4 className="h6">Comments:</h4>
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
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Post;
