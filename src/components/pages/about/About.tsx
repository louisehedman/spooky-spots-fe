const Spinner: React.FC = () => {
  return (
    <div
      className="container rounded text-white my-4 py-4"
      style={{ backgroundColor: "#0e284a" }}
    >
      <h2 className="text-center my-4">About Spooky Spots</h2>

      <div
        className="card rounded mb-4 text-center border-0"
        style={{ backgroundColor: "#0e284a" }}
      >
        <div className="card-body w-75 m-auto">
          <h3>Our history</h3>
          <p>
            A group of ghost hunters noticed an increased interest in haunted
            places, but didn't know of any good worldwide community on the
            subject. Therefore they with a developer student at Chas Academy
            decided to create one. SpookySpots is the result, which is still
            under development. A map with markers for each SpookySpot, detailed
            info about each place, ghost type info, advanced search, possibility
            to save SpookySpots in your own list and of course a great community
            fulfills a ghost fan's every wish. It's also a PWA that is even
            available offline!
          </p>

          <h3>Contact</h3>
          <address>
            <p>
              <i className="fas fa-home mr-3"></i> SpookySpots, Chasgatan 3, 123
              45, SE
            </p>
            <p>
              <i className="fas fa-envelope mr-3"></i>{" "}
              <a
                className="text-white text-decoration-none"
                href="mailto:spookyspots2022@gmail.com"
              >
                spookyspots2022@gmail.com
              </a>
            </p>
            <p>
              <i className="fas fa-phone mr-3"></i>{" "}
              <a
                className="text-white text-decoration-none"
                href="tel:+4670707070"
              >
                +46 70 70 70 70
              </a>
            </p>
          </address>

          <h3>Work with us</h3>
          <p>
            We are always open to new employees when we find the right person.
            Send us an email and describe yourself and your skills, and we will
            check if we are a match. For the moment we search for more
            full-stack developers, a social media ambassador and an exorcist.
          </p>

          <h3>Privacy policy</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            dolores animi fugit eos rerum quos rem voluptate porro corrupti
            aperiam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
