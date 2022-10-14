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
      <div className="d-flex row justify-content-between">
        {ghostTypes.map((ghostType: IGhostType, index: any) => {
          return (
            <div
              className="card border-0 col-lg-6"
              style={{ backgroundColor: "#0e284a" }}
              key={index}
            >
              <div className="card-header">
                <Link
                  to={"/ghosttypes/" + ghostType.type}
                  className="text-white h5"
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
