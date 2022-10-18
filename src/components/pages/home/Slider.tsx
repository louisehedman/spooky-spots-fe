import { Carousel } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { useEffect, useState } from "react";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import { Link } from "react-router-dom";

const SpookySpotSlider: React.FC = () => {
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
  const spookySpotsClone = [...spookySpots];

  useEffect(() => {
    const fetchSpookySpots = async () => {
      try {
        await axios.get(API_URL("spookyspots")).then((response: any) => {
          setSpookySpots(response.data.spookySpots);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpookySpots();
  }, []);

  spookySpotsClone
    .sort((a, b) =>
      a.createdAt.toString().localeCompare(b.createdAt.toString())
    )
    .reverse();

  return (
    <div className="container py-4 px-4 pt-4 text-white">
      <div className="card border-0" style={{ backgroundColor: "#0e284a" }}>
        <h2 className="text-center py-2">Most recently added SpookySpots</h2>
        <Carousel
          className="rounded w-100"
          style={{ backgroundColor: "#0e284a" }}
        >
          {spookySpotsClone
            .slice(0, 3)
            .map((spookySpot: ISpookySpot, index: any) => {
              return (
                <Carousel.Item
                  className="text-center pt-4 carousel"
                  style={{
                    height: "500px",
                  }}
                  key={index}
                  interval={5000}
                >
                  <Link to={"/spookyspots/" + spookySpot.name}>
                    <img
                      className="img-fluid border"
                      src={`${spookySpot.image}`}
                      alt={"slide" + index}
                      width="10px"
                      style={{
                        width: "250px",
                        height: "250px",
                      }}
                    />
                  </Link>
                  <Carousel.Caption>
                    <h3>{spookySpot.name}</h3>
                    <div className="d-flex justify-content-center">
                      <Link
                        className="p-1 mx-1 my-3 btn btn-light"
                        to={"/spookyspots/" + spookySpot.name}
                      >
                        Read more
                      </Link>
                    </div>
                    <p className="text-white">
                      Created at:{" "}
                      {new Date(spookySpot.createdAt).toLocaleDateString()}
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
};

export default SpookySpotSlider;
