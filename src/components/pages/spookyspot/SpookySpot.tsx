import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import { API_URL } from "../../../helpers/Urls";

const SpookySpot: React.FC = () => {
  const [spookySpot, setSpookySpot] = useState<ISpookySpot>();
  let { slug } = useParams();

  useEffect(() => {
    const getSpookySpot = async () => {
      await axios.get(API_URL(`spookyspots/${slug}`)).then((res) => {
        setSpookySpot({
          _id: res.data.spookySpot._id,
          name: res.data.spookySpot.name,
          address: res.data.spookySpot.adress,
          postalCode: res.data.spookySpot.postalCode,
          country: res.data.spookySpot.country,
          location: res.data.spookySpot.location,
          description: res.data.spookySpot.description,
          image: res.data.spookySpot.image,
          createdAt: res.data.spookySpot.createdAt,
          rating: res.data.spookySpot.rating,
          ghostTypes: res.data.spookySpot.ghostTypes,
        });
      });
    };

    getSpookySpot();
  }, [slug]);

  return (
    <div>
      <div className="container px-4 pt-4 rounded w-100 mb-4 px-4 pb-4 py-4">
        <div className="text-center mb-4 py-4">
          <h2 className="text-center py-2">{spookySpot?.name}</h2>
          <img
            className="mx-auto d-block img-fluid"
            src={`${spookySpot?.image}`}
            alt={`${spookySpot?.name}`}
            width="20px"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        </div>
        <div className="container px-4 pb-4 py-4 text-left shadow-lg">
          <h3 className="text-center">Description</h3>
          <p>{spookySpot?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SpookySpot;
