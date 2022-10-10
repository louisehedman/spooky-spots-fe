import axios from "axios";
import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import * as geolib from "geolib";
import { Link } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpot } from "../../../interfaces/Interfaces";

const SpookySpots: React.FC = () => {
  const ratingStep = 1;
  const distanceStep = 1;
  const ratingMin = 1;
  const ratingMax = 5;
  const distanceMin = 0;
  const distanceMax = 20004;
  const [ratingValues, setRatingValues] = useState([ratingMin, ratingMax]);
  const [distanceValues, setDistanceValues] = useState([
    distanceMin,
    distanceMax,
  ]);
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
  const [userLat, setUserLat] = useState<any>();
  const [userLon, setUserLon] = useState<any>();

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
        }
      );
    };

    const fetchSpookySpots = async () => {
      try {
        await axios.get(API_URL("spookySpots")).then((response: any) => {
          setSpookySpots(response.data.spookySpots);
        });
      } catch (error) {
        console.log(error);
      }
    };


    getUserLocation();
    fetchSpookySpots();
  }, [userLon, userLat, spookySpots]);

  return (
    <div
      className="container rounded text-white my-4 py-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">SpookySpots</h2>

      <div
        className="card rounded mb-4 text-center bg-secondary bg-opacity-25 border border-white"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div className="card-body w-75 m-auto">
          <h2 className="card-title my-3 text-primary">Sort By</h2>
          <h3 className="card-subtitle mt-2 mb-3">Rating</h3>
          <Range
            values={ratingValues}
            step={ratingStep}
            min={ratingMin}
            max={ratingMax}
            onChange={(ratingValues) => {
              console.log(ratingValues);
              setRatingValues(ratingValues);
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: ratingValues,
                      colors: ["#ccc", "#548BF4", "#ccc"],
                      min: ratingMin,
                      max: ratingMax,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "1.5em",
                  width: "1.5em",
                  borderRadius: "4px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              >
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "#548BF4" : "#CCC",
                  }}
                />
              </div>
            )}
          />
          <output style={{ marginBottom: "30px", float: "left" }}>
            {ratingValues[0]}
          </output>
          <output style={{ marginBottom: "30px", float: "right" }}>
            {ratingValues[1]}
          </output>
          <h3 className="card-subtitle mt-4 mb-3">Distance from me</h3>
          <Range
            values={distanceValues}
            step={distanceStep}
            min={distanceMin}
            max={distanceMax}
            onChange={(distanceValues) => {
              console.log(distanceValues);
              setDistanceValues(distanceValues);
            }}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "36px",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: distanceValues,
                      colors: ["#ccc", "#548BF4", "#ccc"],
                      min: distanceMin,
                      max: distanceMax,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "1.5em",
                  width: "1.5em",
                  borderRadius: "4px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 2px 6px #AAA",
                }}
              >
                <div
                  style={{
                    height: "16px",
                    width: "5px",
                    backgroundColor: isDragged ? "#548BF4" : "#CCC",
                  }}
                />
              </div>
            )}
          />
          <output style={{ marginBottom: "30px", float: "left" }}>
            {distanceValues[0] + " km"}
          </output>
          <output style={{ marginBottom: "30px", float: "right" }}>
            {distanceValues[1] + " km"}
          </output>
        </div>
      </div>
      <h2 className="my-3 text-center">Matching SpookySpots</h2>
      <ul className="list-unstyled">
        {spookySpots.map((spookySpot: any) => {
          if (
            spookySpot.rating >= ratingValues[0] &&
            spookySpot.rating <= ratingValues[1] &&
            geolib.getDistance(
              { longitude: userLon, latitude: userLat },
              {
                latitude: spookySpot.location.coordinates[1],
                longitude: spookySpot.location.coordinates[0],
              }
            ) /
              1000 >=
              distanceValues[0] &&
            geolib.getDistance(
              { longitude: userLon, latitude: userLat },
              {
                latitude: spookySpot.location.coordinates[1],
                longitude: spookySpot.location.coordinates[0],
              }
            ) /
              1000 <=
              distanceValues[1]
          ) {
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
                  <p className="w-75 m-auto py-2 h4">
                    Rating: {spookySpot.rating}/5{" "}
                    <i className="fa-solid fa-ghost" />
                  </p>
                  <h4 className="py-2">Address:</h4>
                  <address>
                    <p>{spookySpot?.address}</p>
                    <p>{spookySpot?.postalCode}</p>
                    <p>{spookySpot?.country}</p>
                  </address>
                  <Link to={"/spookyspots/" + spookySpot.name}>
                    <button className="p-1 mx-1 my-3 btn btn-success">
                      Find out more about {spookySpot.name}
                    </button>
                  </Link>
                </li>
              </div>
            );
          } else return null;
        })}
      </ul>
    </div>
  );
};

export default SpookySpots;
