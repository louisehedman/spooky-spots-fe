import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../helpers/Urls";
import { ISpookySpot } from "../../interfaces/Interfaces";
import "./SearchSpookySpot.css";

const SearchSpookySpot: React.FC = () => {
    const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
    const [search, setSearch]: [string, (search: string) => void] = useState("");

    useEffect(() => {
        if (spookySpots.length === 0) {
          try {
            axios.get(API_URL("spookySpots")).then((response: any) => {
              setSpookySpots(response.data.spookySpots);
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    
    return (
      <div>

      </div>
    );
  };
  
  export default SearchSpookySpot;