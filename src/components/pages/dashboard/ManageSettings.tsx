import { Link } from "react-router-dom";

const ManageSettings: React.FC = () => {
  return (
    <div
      className="container rounded my-4 mb-4 text-white"
      style={{ backgroundColor: "#0e284a" }}
    >
      <div
        className="card border-0 col-lg-6 col-md-8 m-auto"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div className="card-header">
          <h2>
            Edit email and password
            <Link
              to="/dashboard/handleusers"
              className="btn btn-dark float-end mb-2"
            >
              BACK
            </Link>
          </h2>
        </div>
        <div className="card-body"></div>
      </div>
    </div>
  );
};

export default ManageSettings;
