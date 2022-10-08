import axios from "axios";
import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { Link } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpot } from "../../../interfaces/Interfaces";

const SpookySpots: React.FC = () => {
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);

  useEffect(() => {
    const fetchSpookySpots = async () => {
      try {
        await axios.get(API_URL("spookySpots")).then((response: any) => {
          setSpookySpots(response.data.spookySpots);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpookySpots();
  }, []);

  return (
    <div
      className="container rounded text-white my-4 py-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">SpookySpots</h2>

      <div
        className="card rounded mb-4 text-center border-0"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div className="card-body w-75 m-auto"></div>
      </div>
      <h2 className="my-3 text-center text-warning">Matching SpookySpots</h2>
      <ul className="list-unstyled">
        {spookySpots.map((spookySpot: any) => {
          return (
            <div
              key={spookySpot._id}
              className="card mt-2 rounded mb-4 border border-0 text-center text-white"
              style={{ backgroundColor: "#0e284a" }}
            >
              <li className="mt-2">
                <h3>{spookySpot.name}</h3>
                <img
                  className="img-fluid"
                  src={`${spookySpot.image}`}
                  alt={"picture of " + spookySpot.name}
                  width="10px"
                  style={{
                    width: "250px",
                    height: "250px",
                  }}
                />
                <p className="w-75 m-auto">
                  Rating: {spookySpot.rating}/5{" "}
                  <i className="fa-solid fa-ghost" />
                </p>
                <Link to={"/spookyspots/" + spookySpot.name}>
                  <button className="p-1 mx-1 my-3 btn btn-success">
                    Find out more about {spookySpot.name}
                  </button>
                </Link>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SpookySpots;
