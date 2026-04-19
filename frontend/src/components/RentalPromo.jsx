import { useNavigate } from "react-router-dom";

const rentals = [
  {
    name: "Daily Laptop Hire",
    description: "High-performance laptops for work, school, or events.",
    price: "From ₹299/day",
  },
  {
    name: "Projector Rental",
    description: "Bright projectors for meetings, presentations, and cinema nights.",
    price: "From ₹499/day",
  },
  {
    name: "Gaming Console Hire",
    description: "Play the latest titles with instant setup and delivery.",
    price: "From ₹399/day",
  },
];

const RentalPromo = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-12 rounded-[32px] border border-sand bg-espresso/95 p-8 shadow-2xl shadow-espresso/20 text-cream">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-caramel mb-4">Rental products</p>
          <h2 className="text-3xl md:text-4xl font-extrabold"> rental deals </h2>
          <p className="mt-4 text-cream/80 leading-relaxed">
            Browse our most popular rental products now. Fast delivery, easy booking, and flexible return options for all your devices.
          </p>
        </div>

        <button
          onClick={() => navigate("/rentals")}
          className="inline-flex items-center justify-center rounded-full bg-caramel px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-lg shadow-caramel/30 hover:bg-[#b47d4d] transition"
        >
          View rental deals
        </button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {rentals.map((item) => (
          <div key={item.name} className="rounded-3xl border border-sand bg-mocha p-6 shadow-xl shadow-espresso/20 transition hover:-translate-y-1 hover:bg-espresso">
            <h3 className="text-xl font-semibold mb-3 text-cream">{item.name}</h3>
            <p className="text-cream/80 mb-4">{item.description}</p>
            <p className="font-semibold text-caramel">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RentalPromo;
