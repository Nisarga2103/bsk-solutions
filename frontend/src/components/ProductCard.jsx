import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert("Added to cart 🛒");
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-cream rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={`/${product.image}`}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-espresso text-sm mb-1">{product.category_name}</p>
        <p className="text-sienna text-sm mb-3 line-clamp-3">{product.description}</p>
        <p className="text-espresso font-bold text-xl mb-3">₹{product.price}</p>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-espresso hover:bg-[#59331f] text-cream py-2 rounded-lg text-sm"
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="flex-1 bg-mocha hover:bg-espresso text-cream py-2 rounded-lg text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;