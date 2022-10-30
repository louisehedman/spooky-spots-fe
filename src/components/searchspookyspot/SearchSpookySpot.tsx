import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../helpers/Urls";
import { ISpookySpot } from "../../interfaces/Interfaces";
import "./SearchSpookySpot.css";

const SearchSpookySpot: React.FC = () => {
  const [spookySpots, setSpookySpots] = useState<ISpookySpot[]>([]);
  const [search, setSearch]: [string, (search: string) => void] = useState("");

  // String formatter
  const handleChange = (e: { target: { value: string } }) => {
    const formatString = e.target.value.toLowerCase();
    setSearch(formatString);
  };

  // Clear the input field
  const resetInputField = () => {
    setSearch("");
  };

  useEffect(() => {
    // Get and set SpookySpots
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
    <div className="spookySpotContainer">
      <div className="row">
        <div className="spookySpot-card">
          <div className="card-body">
            <ul className="list-unstyled">
              <input
                className="form-control me-2"
                aria-labelledby="searchfield"
                id="searchfield"
                type="search"
                value={search}
                placeholder="Search spooky-spot by name or country"
                onChange={handleChange}
              />
              <div className="searchedSpookySpot">
                {spookySpots.map((spookySpot: any, index: any) => {
                  if (
                    (spookySpot.name.toLowerCase().startsWith(search) &&
                      search) ||
                    (spookySpot.country.toLowerCase().startsWith(search) &&
                      search)
                  ) {
                    return (
                      <li
                        key={index}
                        style={{ borderBottom: "2px solid #fff" }}
                      >
                        <h3>{spookySpot.name}</h3>
                        <address>
                          <p>{spookySpot.address}</p>
                          <p>{spookySpot.postalCode}</p>
                          <p>{spookySpot.country}</p>
                        </address>
                        <p>
                          Rating: {spookySpot.rating}/5{" "}
                          <i className="fa-solid fa-ghost" />
                        </p>
                        <Link to={"/spookyspots/" + spookySpot.name}>
                          <button
                            onClick={resetInputField}
                            className="p-1 mx-1 my-3 btn spookySpot-btn btn-success"
                          >
                            Find out more about spooky-spot
                          </button>
                        </Link>
                      </li>
                    );
                  } else return null;
                })}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSpookySpot;
