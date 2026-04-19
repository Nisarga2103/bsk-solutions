import { useEffect, useState } from "react";
import API from "../services/api";
import RentalPromo from "../components/RentalPromo";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);

  const fetchRentals = async () => {
    try {
      const res = await API.get("/rentals");
      setRentals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <div className="bg-cream text-espresso min-h-screen p-6">
      <RentalPromo />

      <div className="max-w-6xl mx-auto mb-8 rounded-[32px] border border-sand bg-parchment p-8 shadow-2xl shadow-espresso/10">
        <h1 className="text-3xl font-bold mb-3 text-center text-espresso">Your Rentals</h1>
        <p className="text-espresso/80 text-center">Review your active rental products and discover new rental deals on every page.</p>
      </div>

      {rentals.length === 0 ? (
        <p className="text-center">No rentals yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {rentals.map((r) => (
            <div
              key={r.id}
              className="bg-parchment p-5 rounded-xl shadow hover:shadow-lg transition"
            >

              <h2 className="text-xl font-semibold mb-2">
                {r.product_name || `Product #${r.product_id}`}
              </h2>

              <p className="text-espresso/80 mb-1">
                Type: {r.rental_type || "Rental"}
              </p>

              <p className="text-espresso/80 mb-1">
                Start: {r.start_date}
              </p>

              <p className="text-espresso/80 mb-1">
                End: {r.end_date}
              </p>

              <p className="text-espresso font-bold mb-2">
                ₹{r.total_cost}
              </p>

              <p
                className={`text-sm font-semibold ${
                  r.status === "active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {r.status}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Rentals;