"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Helper for image URLs
function getValidImageUrl(url) {
  if (!url) return "/product-placeholder.jpg";
  if (typeof url === "string" && url.includes(",")) url = url.split(",")[0];
  if (url.startsWith("http") || url.startsWith("/")) return url;
  return "/" + url;
}

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCart() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your cart");
          return;
        }
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to load cart");
        const data = await res.json();
        setCart(Array.isArray(data) ? data : data.cart || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const updatedCart = await res.json();
      setCart(Array.isArray(updatedCart) ? updatedCart : updatedCart.cart || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to remove item");
      const updatedCart = await res.json();
      setCart(Array.isArray(updatedCart) ? updatedCart : updatedCart.cart || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1), 0);

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair mb-8">Your Cart</h1>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error} <Link href="/login" className="underline">Login here</Link>
        </div>
      )}
      {!loading && cart.length === 0 && !error ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/products" className="bg-black text-white px-6 py-2 rounded font-montserrat">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cart.map(item => (
            <div key={item.id} className="border p-4 rounded-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={getValidImageUrl(item.product?.images)}
                    alt={item.product?.name || "Product"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-playfair">{item.product?.name}</h3>
                  <p className="font-montserrat">${item.product?.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded">
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 font-montserrat">{item.quantity}</span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-montserrat"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-playfair text-xl">Subtotal:</span>
              <span className="font-montserrat font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout" 
              className="block w-full bg-black text-white py-3 text-center rounded font-montserrat hover:bg-gray-900 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
