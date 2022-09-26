import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ISpookySpot } from "../../../interfaces/Interfaces";
import { API_URL } from "../../../helpers/Urls";

const SpookySpot: React.FC = () => {
  const [spookySpot, setSpookySpot] = useState<ISpookySpot>();
  let { slug } = useParams();

  useEffect(() => {
    const getSpookySpot = async () => {
      await axios.get(API_URL(`spookyspots/${slug}`)).then((res) => {
        setSpookySpot({
          _id: res.data.spookySpot._id,
          name: res.data.spookySpot.name,
          address: res.data.spookySpot.adress,
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

  return <></>;
};

export default SpookySpot;
