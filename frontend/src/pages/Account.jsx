import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const { user, token, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* User Profile */}
          <div className="md:col-span-1 bg-parchment rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-espresso">My Account</h2>
            {user && (
              <div className="space-y-3">
                <div>
                  <p className="text-espresso/80 text-sm">User ID</p>
                  <p className="font-semibold text-espresso">{user.id}</p>
                </div>
                <div>
                  <p className="text-espresso/80 text-sm">Name</p>
                  <p className="font-semibold text-espresso">{user.fullname}</p>
                </div>
                <div>
                  <p className="text-espresso/80 text-sm">Email</p>
                  <p className="font-semibold text-espresso">{user.email}</p>
                </div>
                <div>
                  <p className="text-espresso/80 text-sm">Phone</p>
                  <p className="font-semibold text-espresso">{user.phone}</p>
                </div>
                <div>
                  <p className="text-espresso/80 text-sm">Role</p>
                  <p className="font-semibold uppercase text-espresso">{user.role}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-sienna text-cream py-2 rounded-lg hover:bg-[#7d3218]"
            >
              Logout
            </button>
          </div>

          {/* Orders List */}
          <div className="md:col-span-2 bg-parchment rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-espresso">My Orders</h2>
            {loading ? (
              <p className="text-espresso/80">Loading...</p>
            ) : orders.length === 0 ? (
              <p className="text-espresso/80">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-espresso">Order #{order.id}</p>
                        <p className="text-sm text-espresso/80">{new Date(order.order_date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.payment_status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-espresso/80">Amount:</span>
                      <span className="font-semibold text-espresso">₹{order.total_amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
