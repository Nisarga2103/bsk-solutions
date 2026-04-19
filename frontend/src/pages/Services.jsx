import { useNavigate } from "react-router-dom";
import ServicePromo from "../components/ServicePromo";

const services = [
  {
    name: "Laptop Repair",
    desc: "Fix hardware & software issues quickly and reliably.",
  },
  {
    name: "CCTV Installation",
    desc: "Secure your home or business with expert installation.",
  },
  {
    name: "Networking Setup",
    desc: "Fast WiFi and wired LAN setups for modern offices.",
  },
  {
    name: "Printer Service",
    desc: "Repair, maintenance, and toner replacement.",
  },
  {
    name: "Hardware Upgrade",
    desc: "RAM, SSD, and graphics upgrades to boost performance.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-cream min-h-screen text-espresso py-12">

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-[32px] border border-sand bg-parchment p-8 shadow-2xl shadow-espresso/10 mb-8">
          <h1 className="text-3xl font-bold text-center mb-3 text-espresso">Services</h1>
          <p className="text-espresso/80 text-center max-w-2xl mx-auto">
            Discover our trusted tech services designed to keep your devices running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.map((s, i) => (
          <div
            key={i}
            className="rounded-[24px] border border-sand bg-parchment p-6 shadow-2xl shadow-espresso/10 transition hover:-translate-y-1"
          >
              <h2 className="text-xl font-semibold mb-3 text-espresso">
              {s.name}
            </h2>

            <p className="text-espresso/80 mb-5">
              {s.desc}
            </p>

            <button
              onClick={() => navigate(`/contact?service=${encodeURIComponent(s.name)}`)}
              className="rounded-full bg-espresso px-4 py-2 text-sm font-semibold text-cream hover:bg-mocha transition"
            >
              Book Service
            </button>
          </div>
        ))}

      </div>


      <div className="mt-10">
        <ServicePromo />
      </div>
    </div>
  </div>
  );
};

export default Services;