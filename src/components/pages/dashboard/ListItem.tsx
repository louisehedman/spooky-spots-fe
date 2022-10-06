import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../helpers/Urls";
import {
  ISpookySpot,
  ISpookySpotListItem,
} from "../../../interfaces/Interfaces";

interface Props {
  listItem: ISpookySpotListItem;
  userId: string | undefined;
}

const ListItem: React.FC<Props> = ({ listItem, userId }) => {
  const [spookySpot, setSpookySpot] = useState<ISpookySpot>();
  const listItemId = listItem._id;

  useEffect(() => {
    const getSpookySpot = async () => {
      await axios
        .get(API_URL(`spookyspots/${listItem.spookySpotId}`))
        .then((res) => {
          setSpookySpot({
            _id: res.data.spookySpot._id,
            name: res.data.spookySpot.name,
            address: res.data.spookySpot.address,
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
  }, [listItem]);

  const deleteListItem = async (
    userId: string | undefined,
    listItemId: string | undefined
  ) => {
    // solves the issue with the withCredentials being set to false despite specified as true in headers
    axios.defaults.withCredentials = true;

    if (localStorage.getItem("signedIn")) {
      console.log(
        "Inside Deletelistitem, token: ",
        localStorage.getItem("signedIn")
      );
      return axios
        .put(API_URL(`delete-list-item/${userId}/${listItemId}`), {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
      <tr>
        <td className="text-black">{spookySpot?.name}</td>
        {listItem.hasVisited === false && <td>No</td>}
        {listItem.hasVisited === true && <td>Yes</td>}

        <td>{listItem.comment}</td>
        <td>
          <Link
            className="btn btn-warning btn-sm"
            to={"editlistitem/" + userId + "/" + listItemId}
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteListItem(userId, listItem._id)}
          >
            Delete
          </button>
        </td>
      </tr>
  );
};

export default ListItem;
