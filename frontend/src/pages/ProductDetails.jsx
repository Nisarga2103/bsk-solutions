import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/products`)
      .then((res) => {
        const found = res.data.find((p) => p.id === Number(id));
        setProduct(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-parchment shadow-lg rounded-xl">

      <img
        src={`/${product.image}`}
        alt={product.name}
        className="w-full h-80 object-cover rounded mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

      <p className="text-espresso mb-2">
        Category: {product.category_name}
      </p>

      <p className="text-lg mb-4">{product.description}</p>

      <p className="text-espresso text-2xl font-bold mb-4">
        ₹{product.price}
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button
        disabled={booking}
        onClick={async () => {
          setError("");
          setBooking(true);
          const today = new Date();
          const endDate = new Date(today);
          endDate.setDate(today.getDate() + 7);

          try {
            await API.post("/rentals", {
              customer_id: 1,
              product_id: product.id,
              start_date: today.toISOString().split("T")[0],
              end_date: endDate.toISOString().split("T")[0],
              total_price: product.price,
              status: "active",
            });

            navigate("/rentals");
          } catch (err) {
            console.error(err);
            setError("Unable to book rental right now. Please try again.");
            setBooking(false);
          }
        }}
        className="bg-espresso text-cream px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mocha transition"
      >
        {booking ? "Booking..." : "Rent Now"}
      </button>

    </div>
  );
};

export default ProductDetails;