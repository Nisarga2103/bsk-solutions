import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const dealsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams.get("tab") === "top-deals" && dealsRef.current) {
      dealsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const query = search.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category_name?.toLowerCase().includes(query);

        return matchesSearch;
      })
      .sort((a, b) => {
        if (sort === "low") return Number(a.price) - Number(b.price);
        if (sort === "high") return Number(b.price) - Number(a.price);
        return 0;
      });
  }, [products, search, sort]);

  return (
    <div className="bg-cream text-espresso min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div ref={dealsRef} className="bg-parchment rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sienna mb-2">Shop the catalog</p>
              <h1 className="text-4xl font-bold text-espresso">Browse our products</h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="w-full sm:w-[340px] border border-sand rounded-full bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caramel"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-sand rounded-full bg-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-caramel"
              >
                <option value="">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <div className="rounded-3xl border border-sand bg-parchment p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-sienna mb-2">Top service deals</p>
              <h2 className="text-2xl font-bold mb-3 text-espresso">Recommended product offers</h2>
              <p className="text-espresso/80 mb-4">These top products are perfect to pair with our service bookings — rent, buy, or compare today.</p>
              <button
                onClick={() => window.location.href = "/rentals"}
                className="inline-flex items-center justify-center rounded-full bg-espresso px-5 py-3 text-sm font-semibold text-cream hover:bg-mocha transition"
              >
                Explore rental deals
              </button>
            </div>
            <div className="rounded-3xl border border-sand bg-mocha p-6 text-cream">
              <p className="text-xs uppercase tracking-[0.3em] text-caramel mb-2">Smart choice</p>
              <h2 className="text-2xl font-bold mb-3">Get service-ready tech</h2>
              <p className="text-cream/80">Choose from our latest laptops and devices, then book service support fast.</p>
            </div>
            <div className="rounded-3xl border border-sand bg-cream p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-sienna mb-2">Why this works</p>
              <h2 className="text-2xl font-bold mb-3 text-espresso">Real product recommendations</h2>
              <p className="text-espresso/80">These featured sections help you move from service booking to the product deals you need without extra clicks.</p>
            </div>
          </div>
        </div>

        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <p className="text-espresso/80">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-cream p-10 text-center text-espresso shadow-xl">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-3xl bg-cream p-10 text-center text-espresso shadow-xl">
              No products found. Try another search.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
