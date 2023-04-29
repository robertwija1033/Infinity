import axios from "axios";

export const addCartItem = async (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (product) => product.productId === productToAdd.productId
  );

  if (existingCartItem) {
    return cartItems.map((product) => {
      if (product.productId == productToAdd.productId) {
        const updateProduct = async () => {
          await axios
            .patch(`http://localhost:8080/carts/${product.id}`, {
              userId: localStorage.getItem("id"),
              productId: productToAdd.productId,
              quantity: parseInt(product.quantity) + 1,
            })
            .catch((err) => {
              console.log(err);
            });
        };

        updateProduct();

        if (parseInt(product.quantity) < parseInt(productToAdd.amount)) {
          return { ...product, quantity: parseInt(product.quantity) + 1 };
        } else return product;
      } else {
        return product;
      }
    });
  }

  const cart = await axios
    .post("http://localhost:8080/carts", {
      userId: localStorage.getItem("id"),
      productId: productToAdd.productId,
      quantity: 1,
    })
    .catch((err) => {
      console.log(err);
    });

  const id = cart.data.messages.id;

  productToAdd = { ...productToAdd, id };

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
