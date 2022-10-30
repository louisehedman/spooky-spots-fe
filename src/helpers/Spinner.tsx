// Spinner to be shown at loading
const Spinner: React.FC = () => {
  return (
    <div className="text-center">
      <div
        className="spinner-border m-auto"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
