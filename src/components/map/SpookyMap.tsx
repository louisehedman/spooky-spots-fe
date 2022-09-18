import "ol/ol.css";
import { RMap, ROSM } from "rlayers";
import { fromLonLat } from "ol/proj";

const SpookyMap: React.FC = () => {
  const center = fromLonLat([14.662, 59.957]);

  return (
    <>
      <div className="container my-5 mx-5">
        <h2 className="text-center my-5">Spooky map</h2>
        <RMap
          width={"100%"}
          height={"60vh"}
          initial={{ center: center, zoom: 5 }}
        >
          <ROSM />
        </RMap>
      </div>
    </>
  );
};

export default SpookyMap;
