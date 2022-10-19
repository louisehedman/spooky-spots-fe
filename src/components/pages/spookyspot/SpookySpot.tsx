import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import AddToListButton from "./AddToListButton";

const SpookySpot: React.FC = () => {
  const [spookySpot, setSpookySpot] = useState<ISpookySpot>();
  let { slug } = useParams();

  const navigate = useNavigate();

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
      <div
        className="container px-4 pt-4 rounded w-100 mb-4 pb-4 py-4 my-4 text-white"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div
          className="card text-center mb-2 py-4 border-0 m-auto"
          style={{ backgroundColor: "#0e284a" }}
        >
          <div>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-dark float-end"
            >
              BACK
            </button>
          </div>
          <h2 className="text-center py-4">{spookySpot?.name}</h2>
          <AddToListButton spookySpotId={spookySpot?._id} />
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
        <div
          className="card border-0 px-4 pb-4 py-4 text-center"
          style={{ backgroundColor: "#0e284a" }}
        >
          <h3 className="text-center">Description</h3>
          <p>{spookySpot?.description}</p>
          <h4 className="border-top py-2">Ghost types</h4>
          <ul className="list-group w-50 mx-auto border-0">
            {spookySpot?.ghostTypes.map(({ type }) => (
              <li
                className="list-group-item text-white border-0"
                style={{ backgroundColor: "#0e284a" }}
                key={type}
              >
                <Link className="text-white" to={"/ghostTypes/" + type}>
                  {type}
                </Link>
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
          </address>
          <Link to={"/spookymap"}>
            <button className="p-1 mb-3 btn btn-success">Go to map</button>
          </Link>

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
