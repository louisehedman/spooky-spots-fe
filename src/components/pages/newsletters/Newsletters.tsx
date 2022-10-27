import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../../helpers/Spinner";
import { API_URL } from "../../../helpers/Urls";
import { INewsletter } from "../../../interfaces/Interfaces";
import Pagination from "./Pagination";

const Newsletters: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [newsletters, setNewsletters] = useState<INewsletter[]>([]);
  const newslettersClone = [...newsletters];
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        await axios.get(API_URL("newsletters")).then((response: any) => {
          setNewsletters(response.data.newsletters);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  // Let last created newsletters be shown first
  newslettersClone
    .sort((a, b) =>
      a.createdAt.toString().localeCompare(b.createdAt.toString())
    )
    .reverse();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = newslettersClone.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: React.SetStateAction<number>) =>
    setCurrentPage(pageNumber);

  return (
    <div
      className="container py-4 px-2 pt-4 text-white rounded text-center"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">Newsletters</h2>
      <p className="h5 mb-4 fw-light">
        Here you can read all archived newsletters
      </p>
      {loading ? (
        <Spinner />
      ) : (
        currentPosts.map((newsletter: INewsletter, index: any) => {
          return (
            <div
              className="card border-0 col-lg-10 bg-white my-4 m-auto text-black"
              key={index}
            >
              <div className="card-header border-white bg-light my-2">
                <h3
                  className="card-header text-center text-white h4"
                  style={{ backgroundColor: "#0e284a" }}
                >
                  {newsletter.subject}
                </h3>
                <p className="m-auto">
                  Created: {new Date(newsletter.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-body">
                <p>{newsletter.message}</p>
              </div>
            </div>
          );
        })
      )}
      <div className="d-flex justify-content-center">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={newsletters.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Newsletters;
