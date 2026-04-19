import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Laptop Repair",
    description: "Fix hardware & software issues quickly and reliably.",
    price: "From ₹499",
  },
  {
    name: "CCTV Installation",
    description: "Secure your home or business with expert installation.",
    price: "From ₹999",
  },
  {
    name: "Networking Setup",
    description: "Fast WiFi and wired LAN setups for modern offices.",
    price: "From ₹799",
  },
];

const ServicePromo = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-12 rounded-[32px] border border-sand bg-espresso/95 p-8 shadow-2xl shadow-espresso/20 text-cream">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-caramel mb-4">Tech services</p>
          <h2 className="text-3xl md:text-4xl font-extrabold"> service deals </h2>
          <p className="mt-4 text-cream/80 leading-relaxed">
            Browse our most popular tech services now. Expert technicians, fast turnaround, and reliable solutions for all your device needs.
          </p>
        </div>

        <button
          onClick={() => navigate("/services")}
          className="inline-flex items-center justify-center rounded-full bg-caramel px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-espresso shadow-lg shadow-caramel/30 hover:bg-[#b47d4d] transition"
        >
          View service deals
        </button>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {services.map((item) => (
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

export default ServicePromo;