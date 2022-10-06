import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../helpers/Urls";
import { ISpookySpotListItem } from "../../../interfaces/Interfaces";
import { Props } from "./AddToListButton";

const AddToListForm: React.FC<Props> = ({ spookySpotId, setAddedToList }) => {
  const [state, setState] = useState<ISpookySpotListItem>({
    spookySpotId: spookySpotId,
    comment: "",
    hasVisited: false,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    boolValue?: boolean
  ) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: boolValue !== undefined ? boolValue : value,
    });
    console.log(value);
    console.log(boolValue);
  };

  const handleSubmit = async (e: React.SyntheticEvent, url: string) => {
    e.preventDefault();
    try {
      let listItemDetails = state;
      let res = await axios.patch(url, listItemDetails, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("res: ", res);
      if (res.status === 200) {
        if (setAddedToList !== undefined) setAddedToList(true);
        console.log(res);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        className="w-90 m-auto text-black"
        onSubmit={(e) =>
          handleSubmit(e, API_URL("create-list-item"))
        }
      >
        <div className="form-group  my-4">
          <label className="d-block">Have you visited?</label>
          <label htmlFor="hasNotVisited">No:</label>
          <input
            className="ms-2 me-4"
            type="radio"
            id="hasNotVisited"
            name="hasVisited"
            checked={false === state.hasVisited}
            value="false"
            onChange={(e) => {
              handleChange(e, false);
            }}
          />
          <label htmlFor="hasVisited">Yes</label>
          <input
            className="ms-2 me-4"
            type="radio"
            id="hasVisited"
            name="hasVisited"
            checked={true === state.hasVisited}
            value="true"
            onChange={(e) => {
              handleChange(e, true);
            }}
          />

          <div className="form-group my-4">
            <label className="d-block">Comment:</label>
            <textarea
              name="comment"
              placeholder="Make a note about this place..."
              value={state.comment}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <input
            className="btn btn-outline-success btn-block"
            type="submit"
            value="Add to list"
          />
        </div>
      </form>
    </>
  );
};

export default AddToListForm;
