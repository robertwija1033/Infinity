import Alert from "../Alert/Alert";
import "./Cart.css";
import { useContext } from "react";
import { convertToCurrency } from "../Home/convertToCurrency";
import CartContext from "../../context/actions/cart/cartContext";

const TableCart = () => {
  const { cartItems, addItemToCart, subtractItemToCart, deleteItemToCart } =
    useContext(CartContext);

  return (
    <>
      {cartItems.length ? null : (
        <Alert
          Text={"You don't have any Cart, Please Add To Cart on Detail Page!"}
          AlertStyle={{
            border: "1px solid #f5c2c7",
            backgroundColor: "#F8D7DA",
            color: "#842029",
          }}
          IconStyle={"#842029"}
          Icon={"bi bi-exclamation-circle-fill"}
          Expression={true}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((data) => (
            <tr key={data.id}>
              <td className="title" data-label="Item">
                <div className="image">
                  <img src={`${data.image}`} />
                </div>
                <div className="content-image">
                  <h3>{data.nameProduct}</h3>
                </div>
              </td>
              <td data-label="Quantity">
                <div className="quantity">
                  <button onClick={() => subtractItemToCart(data)} name="less">
                    -
                  </button>
                  <p>{data.quantity}</p>
                  <button onClick={() => addItemToCart(data)} name="plus">
                    +
                  </button>
                </div>
              </td>
              <td data-label="Price">
                {convertToCurrency(data.price * data.quantity)}
              </td>
              <td>
                <div className="remove">
                  <i
                    className="bi bi-trash"
                    onClick={() => deleteItemToCart(data)}
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableCart;
