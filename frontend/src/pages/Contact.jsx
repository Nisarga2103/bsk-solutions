import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const service = useMemo(() => searchParams.get("service") || "", [searchParams]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-cream rounded-3xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-espresso">Contact Us</h1>
      {service && (
        <p className="mb-4 text-espresso/80">Booking request for: <span className="font-semibold text-espresso">{service}</span></p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-sand bg-parchment p-2 w-full rounded-lg"
          placeholder="Your Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="border border-sand bg-parchment p-2 w-full rounded-lg"
          placeholder="Email"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-sand bg-parchment p-2 w-full rounded-lg min-h-[140px]"
          placeholder={service ? `Describe your ${service} requirements` : "Message"}
          required
        />
        <button className="bg-espresso text-cream px-4 py-2 rounded hover:bg-mocha transition w-full">
          Send Message
        </button>
        {sent && <p className="text-green-700">Your message has been sent. We will be in touch soon.</p>}
      </form>
    </div>
  );
};

export default Contact;