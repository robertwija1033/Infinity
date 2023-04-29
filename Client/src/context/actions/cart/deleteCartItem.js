import axios from "axios";

export const deleteCartItem = async (cartItems, productToDelete) => {
  cartItems.map((cart) => {
    if (cart.productId === productToDelete.productId) {
      const deleteProduct = async () => {
        await axios
          .delete(`http://localhost:8080/carts/${cart.id}`)
          .catch((err) => {
            console.log(err);
          });
      };

      deleteProduct();
    }
  });

  return cartItems.filter(
    (product) => product.productId !== productToDelete.productId
  );
};
