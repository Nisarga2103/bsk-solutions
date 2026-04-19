import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <main className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/20 to-cream/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_transparent_35%)]" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="container mx-auto px-6 py-6 md:px-10">
            <div className="flex items-center justify-center rounded-full border border-sand/80 bg-parchment/90 px-6 py-3 shadow-lg shadow-espresso/10 backdrop-blur-sm">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-espresso/90">BSK Solutions</span>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-5xl flex-1 items-center px-6 pb-20 md:px-10">
            <div className="w-full rounded-[36px] border border-sand/70 bg-white/85 p-10 shadow-[0_40px_100px_-40px_rgba(72,44,25,0.2)] backdrop-blur-xl md:p-14">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-sienna/90">Electronics, rentals, and support</p>
              <h1 className="text-5xl font-black leading-tight text-espresso md:text-6xl">
                BSK Solutions
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-espresso/70 md:text-xl">
                Shop premium electronics, rent devices for short-term projects, and get expert service across the UK.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-3 text-base font-semibold text-cream shadow-xl shadow-espresso/20 transition hover:bg-mocha"
                >
                  Shop electronics
                </button>
                <button
                  onClick={() => navigate("/rentals")}
                  className="inline-flex items-center justify-center rounded-full border border-espresso px-8 py-3 text-base font-semibold text-espresso transition hover:bg-sand"
                >
                  Browse rentals
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
