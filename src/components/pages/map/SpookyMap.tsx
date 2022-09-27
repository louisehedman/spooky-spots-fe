import { useEffect, useState } from "react";
import axios from "axios";
import {
  RMap,
  ROSM,
  RLayerVector,
  RFeature,
  ROverlay,
  RPopup,
} from "rlayers";
import { fromLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import "ol/ol.css";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import { API_URL } from "../../../helpers/Urls";

const SpookyMap: React.FC = () => {
  const center = fromLonLat([14.662, 59.957]);
  const [userLat, setUserLat] = useState<any>();
  const [userLon, setUserLon] = useState<any>();
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);

  const [userCoords, setUserCoords] = useState<Record<string, Coordinate>>({
    origin: [userLat, userLon],
  });

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
          setUserCoords({ origin: [userLon, userLat] })
        }
      );
    };
    getUserLocation();
  }, [userLat, userLon]);

  console.log(userCoords)

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
    <div className="container rounded mb-5 text-white" style={{backgroundColor: "#0e284a"}}>
      <h2 className="text-center my-4 py-4">Spooky map</h2>
      <RMap
        width={"100%"}
        height={"70vh"}
        initial={{ center: center, zoom: 5 }}
      >
        <ROSM />
        <RLayerVector zIndex={10}>
          <RFeature geometry={new Point(fromLonLat(userCoords.origin))}>
            <ROverlay className="no-interaction">
              <img
                src={"/spookyspotslogo.png"}
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

            <RPopup trigger={"click" || "hover"} className="example-overlay">
              <div className="card text-center">
                <p className="card-header" style={{backgroundColor: "#0e284a"}}>
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
                    src={"/spookyspotslogo.png"}
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
                <RPopup
                  trigger={"click" || "hover"}
                  className="example-overlay"
                >
                  <div className="card w-25">
                    <p className="card-header" style={{backgroundColor: "#0e284a"}}>
                      <strong>{spookySpot.name}</strong>
                    </p>
                    <div className="card-body text-center">
                      <img
                        className="img-fluid"
                        style={{
                          width: "90%",
                        }}
                        src={`${spookySpot.image}`}
                        alt={`${spookySpot.name}`}
                      />
                    </div>
                  </div>
                </RPopup>
              </RFeature>
            );
          })}
        </RLayerVector>
      </RMap>
      <p>{userLat}</p>
      <p>{userLon}</p>
    </div>
  );
};

export default SpookyMap;
