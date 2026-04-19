import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, i) => (
        <div key={i} className="border p-3 mb-3 rounded flex justify-between">

          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-3 rounded"
          >
            Remove
          </button>

        </div>
      ))}

      <h2 className="mt-4 font-bold text-lg">
        Total: ₹{total}
      </h2>

    </div>
  );
};

export default Cart;