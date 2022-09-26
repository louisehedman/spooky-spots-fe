import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpot } from "../../../interfaces/Interfaces";

const SpookySpot: React.FC = () => {
  const [spookySpot, setSpookySpot] = useState<ISpookySpot>();
  let { slug } = useParams();

  useEffect(() => {
    const getSpookySpot = async () => {
      await axios.get(API_URL(`spookyspots/${slug}`)).then((res) => {
        setSpookySpot({
          _id: res.data.spookySpot._id,
          name: res.data.spookySpot.name,
          address: res.data.spookySpot.address,
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
        <div className="card text-center mb-4 py-4 shadow-lg">
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
        <div className="card px-4 pb-4 py-4 text-center shadow-lg">
          <h3 className="text-center">Description</h3>
          <p>{spookySpot?.description}</p>
          <h4 className="border-top py-2">Ghost types</h4>
          <ul className="list-group w-25 mx-auto border-0">
            {spookySpot?.ghostTypes.map(({ type }) => (
              <li className="list-group-item border-0" key={type}>
                {type}
              </li>
            ))}
          </ul>
          <h4 className="border-top py-2">Address</h4>
          <address>
            <p>{spookySpot?.address}</p>
            <p>{spookySpot?.postalCode}</p>
            <p>{spookySpot?.country}</p>
            <p>
              Coordinates: {spookySpot?.location.coordinates[0]},{" "}
              {spookySpot?.location.coordinates[1]}
            </p>
            <Link to={"/spookymap"}>
              <button className="p-1 mx-1 my-3 btn btn-secondary">
                Go to map
              </button>
            </Link>
          </address>
          <h4 className="border-top py-2">Spooky rate</h4>
          <p>
            <i className="fa-solid fa-ghost" /> {spookySpot?.rating}/5
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpookySpot;
