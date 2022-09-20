import "ol/ol.css";
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from "rlayers";
import { fromLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import { useEffect, useState } from "react";

const SpookyMap: React.FC = () => {
  const center = fromLonLat([14.662, 59.957]);
  const [lat, setLat] = useState<any>();
  const [lon, setLon] = useState<any>();
  const [coords, setCoords] = useState<Record<string, Coordinate>>({
    origin: [],
  });

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setCoords({ origin: [lon, lat] });
          console.log(coords);
        }
      );
    };

    getUserLocation();
  }, [lat, lon]);

  return (
    <div className="container mb-5">
      <h2 className="text-center my-5">Spooky map</h2>
      <RMap
        width={"100%"}
        height={"60vh"}
        initial={{ center: center, zoom: 5 }}
      >
        <ROSM />
        <RLayerVector zIndex={10}>
          <RFeature geometry={new Point(fromLonLat(coords.origin))}>
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
          </RFeature>
        </RLayerVector>
      </RMap>
      <p>{lat}</p>
      <p>{lon}</p>
    </div>
  );
};

export default SpookyMap;
