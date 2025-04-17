"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await fetch("http://localhost:5000/api/wishlist", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setWishlist(Array.isArray(data) ? data : data.wishlist || []);
      } catch {
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist => wishlist.filter(item => item.id !== id));
    // TODO: Sync with backend
  };

  const addToCart = (item) => {
    // TODO: Add to cart logic (and optionally remove from wishlist)
    alert(`Added ${item.name} to cart!`);
  };

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-playfair mb-8 text-center">Your Wishlist</h1>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {!loading && (!wishlist || wishlist.length === 0) ? (
        <div className="text-center text-gray-400 mt-12 text-lg font-montserrat">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wishlist.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
              <div className="relative aspect-square mb-4">
                <Image
                  src={item.image || "/product-placeholder.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-playfair mb-2">{item.name}</h2>
                <p className="text-gray-600 font-montserrat mb-2">{item.category}</p>
                <p className="text-gray-900 font-montserrat mb-4 font-bold">${item.price}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    className="flex-1 border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition font-montserrat"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="flex-1 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition font-montserrat"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
