import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { IGhostType } from "../../../interfaces/Interfaces";

const GhostType: React.FC = () => {
  const [ghostType, setGhostType] = useState<IGhostType>();
  let { slug } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    const getGhostType = async () => {
      await axios.get(API_URL(`ghosttypes/${slug}`)).then((res) => {
        setGhostType({
          _id: res.data.ghostType._id,
          type: res.data.ghostType.type,
          description: res.data.ghostType.description,
        });
      });
    };

    getGhostType();
  }, [slug]);
  return (
    <div>
      <div
        className="container px-4 pt-4 rounded w-100 mb-4 pb-4 py-4 my-4 text-white"
        style={{ backgroundColor: "#0e284a" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="btn btn-dark float-end my-2"
        >
          BACK
        </button>
        <div
          className="card text-center mb-4 py-4 border-0"
          style={{ backgroundColor: "#0e284a" }}
        >
          <h2 className="text-center py-4">{ghostType?.type}</h2>
          <div className="card-body">{ghostType?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default GhostType;
