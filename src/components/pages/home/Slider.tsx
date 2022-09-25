import { Carousel } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../../helpers/Urls";
import { useEffect, useState } from "react";
import { ISpookySpot } from "../../../interfaces/Interfaces";

const SpookySpotSlider: React.FC = () => {
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
  const spookySpotsClone = [...spookySpots];

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

  spookySpotsClone
    .sort((a, b) =>
      a.createdAt.toString().localeCompare(b.createdAt.toString())
    )
    .reverse();

  return (
    <div className="container px-4 pt-4 text-white">
      <h2 className="text-center">Our SpookySpots</h2>
      <Carousel className="bg-secondary rounded w-100 mb-4">
        {spookySpotsClone
          .slice(0, 2)
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
                <img
                  className="img-fluid"
                  src={`${spookySpot.image}`}
                  alt={"slide" + index}
                  width="10px"
                  style={{
                    width: "250px",
                    height: "250px",
                  }}
                />

                <Carousel.Caption>
                  <h3>{spookySpot.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default SpookySpotSlider;
