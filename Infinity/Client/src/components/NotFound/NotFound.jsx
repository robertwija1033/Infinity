import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container-notfound">
      <div className="notfound-image">
        <img src={`${process.env.PUBLIC_URL}/404.png`} />
      </div>
      <div className="notfound-title">
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for might be renamed, removed, or might never
          exist on this planet
        </p>
      </div>
      <Link to={"/"}>Go Back</Link>
    </div>
  );
};

export default NotFound;
