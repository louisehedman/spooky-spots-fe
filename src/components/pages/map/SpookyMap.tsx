import { useEffect, useState } from "react";
import axios from "axios";
import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RPopup,
  RControl,
} from "rlayers";
import { fromLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import "ol/ol.css";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import { API_URL } from "../../../helpers/Urls";
import { Link } from "react-router-dom";

const SpookyMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userLat, setUserLat] = useState<any>();
  const [userLon, setUserLon] = useState<any>();
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
  const [userCoords, setUserCoords] = useState<Record<string, Coordinate>>({
    origin: [userLat, userLon],
  });
  const center = fromLonLat([14.662, 59.957]);

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
          setUserCoords({ origin: [userLon, userLat] });
        }
      );
    };
    getUserLocation();
  }, [userLat, userLon]);

  console.log(userCoords);

  useEffect(() => {
    const fetchSpookySpots = async () => {
      try {
        setLoading(true);
        await axios.get(API_URL("spookyspots")).then((response: any) => {
          setSpookySpots(response.data.spookySpots);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSpookySpots();
  }, []);

  return (
    <div
      className="container rounded pb-5 mb-5 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4 pt-4">Spooky map</h2>
      <p>
        <img
          src={"/images/spookyspotsuserlogo.png"}
          width={36}
          height={36}
          alt="location marker"
        />{" "}
        = Your position
      </p>
      <p>
        <img
          src={"/images/spookyspotslogo.png"}
          width={36}
          height={36}
          alt="location marker"
        />{" "}
        = SpookySpot position
      </p>
      <p>Click on a SpookySpot to get info</p>
      {loading && <p className="text-center my-2 py-2 h5">Loading...</p>}
      <RMap
        width={"100%"}
        height={"70vh"}
        initial={{ center: center, zoom: 5 }}
      >
        <ROSM />
        <RControl.RScaleLine />
        <RLayerVector zIndex={10}>
          <RFeature geometry={new Point(fromLonLat(userCoords.origin))}>
            <ROverlay className="no-interaction">
              <img
                src={"/images/spookyspotsuserlogo.png"}
                style={{
                  position: "relative",
                  top: -18,
                  left: -18,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                width={36}
                height={36}
                alt="location marker"
              />
            </ROverlay>

            <RPopup trigger={"click"} className="example-overlay">
              <div className="card text-center">
                <p
                  className="card-header"
                  style={{ backgroundColor: "#0e284a" }}
                >
                  <strong>Your position</strong>
                </p>
              </div>
            </RPopup>
          </RFeature>
        </RLayerVector>

        <RLayerVector zIndex={10}>
          {spookySpots.map((spookySpot: ISpookySpot, index: any) => {
            return (
              <RFeature
                key={index}
                geometry={
                  new Point(fromLonLat(spookySpot.location.coordinates))
                }
              >
                <ROverlay className="no-interaction">
                  <img
                    src={"/images/spookyspotslogo.png"}
                    style={{
                      position: "relative",
                      top: -18,
                      left: -18,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    width={36}
                    height={36}
                    alt="location marker"
                  />
                </ROverlay>
                <RPopup trigger={"click"} className="example-overlay">
                  <div className="card w-25">
                    <p
                      className="card-header"
                      style={{ backgroundColor: "#0e284a" }}
                    >
                      <strong>{spookySpot.name}</strong>
                    </p>
                    <div className="card-body text-center">
                      <p className="text-black">
                        Rating {spookySpot.rating}/5{" "}
                        <i className="fa-solid fa-ghost" />{" "}
                      </p>
                      <Link to={"/spookyspots/" + spookySpot.name}>
                        <img
                          className="img-fluid"
                          style={{
                            width: "90%",
                          }}
                          src={`${spookySpot.image}`}
                          alt={`${spookySpot.name}`}
                        />
                      </Link>
                    </div>
                  </div>
                </RPopup>
              </RFeature>
            );
          })}
        </RLayerVector>
      </RMap>
    </div>
  );
};

export default SpookyMap;
