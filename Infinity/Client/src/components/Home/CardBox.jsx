import { Link } from "react-router-dom";
import { convertToCurrency } from "./convertToCurrency";

const CardBox = (props) => {
  return (
    <div className="card">
      <div className="image-box">
        {/* <img src={`${process.env.PUBLIC_URL} ${props.image}`} /> */}
        <img src={`${props.image}`} />
      </div>
      <div className="content-card">
        <h2>{props.name}</h2>
        <div className="content">
          <h3>Harga :</h3>
          <span>{convertToCurrency(props.price)}</span>
        </div>
        <div className="content">
          <h3>Sisa produk :</h3>
          <span>{props.remainder}</span>
        </div>
        <div className="information">
          <Link to={`/detail/${props.id}`}>More</Link>
        </div>
        <Link to={`/payment/${props.id}`} className="buy">
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default CardBox;
