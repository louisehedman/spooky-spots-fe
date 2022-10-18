import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { useEffect, useState } from "react";
import { IGhostType } from "../../../interfaces/Interfaces";
import { Link } from "react-router-dom";

const GhostTypes: React.FC = () => {
  const [ghostTypes, setGhostTypes] = useState<IGhostType[]>([]);

  useEffect(() => {
    const fetchGhostTypes = async () => {
      try {
        await axios.get(API_URL("ghosttypes")).then((response: any) => {
          setGhostTypes(response.data.ghostTypes);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGhostTypes();
  }, []);

  return (
    <div
      className="container py-4 px-4 pt-4 text-white rounded text-center w-50"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">Ghost Types</h2>
      <p className="h5 mb-4 fw-light">A ghost is not just a ghost, click on a ghost type below to learn its characteristics!</p>
      <div className="d-flex row justify-content-between">
        {ghostTypes.map((ghostType: IGhostType, index: any) => {
          return (
            <div
              className="card border-0 col-lg-6"
              style={{ backgroundColor: "#0e284a" }}
              key={index}
            >
              <div className="card-header rounded-circle border-white bg-light my-2">
                <Link
                  to={"/ghosttypes/" + ghostType.type}
                  className="text-black h5"
                >
                  {ghostType.type}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GhostTypes;
