import axios from "axios";

export const subtractCartItem = async (cartItems, productToSubtract) => {
  const existingCartItem = cartItems.find(
    (product) => product.productId === productToSubtract.productId
  );
  console.log(productToSubtract);
  if (existingCartItem && parseInt(productToSubtract.quantity) === 1) {
    cartItems.map((cart) => {
      if (cart.productId == productToSubtract.productId) {
        const updateProduct = async () => {
          await axios
            .delete(`http://localhost:8080/carts/${cart.id}`)
            .catch((err) => {
              console.log(err);
            });
        };

        updateProduct();
      }
    });

    return cartItems.filter(
      (product) => product.productId !== productToSubtract.productId
    );
  }

  await axios
    .patch(`http://localhost:8080/carts/${productToSubtract.id}`, {
      userId: localStorage.getItem("id"),
      productId: productToSubtract.productId,
      quantity: parseInt(productToSubtract.quantity) - 1,
    })
    .catch((err) => {
      console.log(err);
    });

  return cartItems.map((product) =>
    product.id === productToSubtract.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
};
