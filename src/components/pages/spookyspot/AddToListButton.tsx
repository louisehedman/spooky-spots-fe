import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import AddToListForm from "./AddToListForm";

export interface Props {
  spookySpotId: string | undefined;
  setAddedToList?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddToListButton: React.FC<Props> = ({ spookySpotId }) => {
  const auth = useContext(AuthContext);
  const [addedToList, setAddedToList] = useState(false);

  return (
    <>
      {!auth?.auth() ? (
        <p className="btn btn-primary m-auto mb-4 w-50">
          <Link to="/register" style={{ color: "white" }}>
            Register/login to save spookyspots to list
          </Link>
        </p>
      ) : (
        <button
          type="button"
          className="btn btn-success w-25 m-auto mb-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add to my list!
        </button>
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title h5 text-black text-center m-auto"
                id="exampleModalLabel"
              >
                Add spooky spot to my list!
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {spookySpotId ? (
                !addedToList ? (
                  <AddToListForm
                    spookySpotId={spookySpotId}
                    setAddedToList={setAddedToList}
                  />
                ) : (
                  <p className="text-black">Spooky-spot added to your list!</p>
                )
              ) : (
                <>
                  <p className="text-black">Something went wrong!</p>
                  <p className="text-black">Please contact support.</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToListButton;
