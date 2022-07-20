import Alert from "../Alert/Alert";
import axios from "axios";
import { useEffect, useState } from "react";
import { convertToCurrency } from "../Home/convertToCurrency";
import { totalPrice } from "../Checkout/totalPrice";

const TableCart = ({ GetItemsCart }) => {
  const quantityEdit = (e, id, quantity, productId) => {
    const name = e.target.name;

    quantity = Number(quantity);

    if (name === "plus") quantity += 1;
    else if (name === "less" && quantity !== 1) quantity -= 1;

    axios
      .post("http://localhost/UAS/Infinity/Server/client/cart.php", {
        url: "http://localhost:3000/editCart",
        id,
        quantity,
        productId,
      })
      .then(function (response) {
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    axios
      .post("http://localhost/UAS/Infinity/Server/client/cart.php", {
        url: "http://localhost:3000/deleteCart",
        id,
      })
      .then(function (response) {
        window.location.reload();
      });
  };

  return (
    <>
      {GetItemsCart.length ? null : (
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
          // setExpression={false}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Barang</th>
            <th>Jumlah</th>
            <th>Harga</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {GetItemsCart.map((data, key) => (
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
                  <button
                    onClick={(e) =>
                      quantityEdit(e, data.id, data.quantity, data.productId)
                    }
                    name="less"
                  >
                    -
                  </button>
                  <p>{data.quantity}</p>
                  <button
                    onClick={(e) =>
                      quantityEdit(e, data.id, data.quantity, data.productId)
                    }
                    name="plus"
                  >
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
                    onClick={() => handleDelete(data.id)}
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
