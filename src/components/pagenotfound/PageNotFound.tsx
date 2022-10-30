const PageNotFound: React.FC = () => {
  // This page will be shown if user navigate to a non-existing page
  return (
    <div
      className="container rounded text-white my-4 py-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <div
        className="card rounded mb-4 text-center border-0"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div className="card-body w-75 m-auto">
          <h2 className="text-center my-4">Sorry, this page does not exist!</h2>
          <img
            className="mb-4 img-fluid"
            src={"/images/puzzle.jpg"}
            alt="puzzle with a missing piece"
            style={{
              width: "250px",
              height: "175px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
