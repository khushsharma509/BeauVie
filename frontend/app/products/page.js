"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";

// Font setup
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [actionMsg, setActionMsg] = useState("");

  // Helper function to handle image URLs
  const getValidImageUrl = (images) => {
    if (!images) return "/default-product.jpg";
    const img = images.split(",")[0].trim();
    return img.startsWith("/") ? img : `/${img}`;
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetch("http://localhost:5000/api/products");
        
        if (!productsRes.ok) {
          const errorData = await productsRes.text();
          throw new Error(`Failed to load products: ${errorData}`);
        }

        const productsData = await productsRes.json();
        setProducts(productsData.products || []);

        // Fetch user data if logged in
        const token = localStorage.getItem("token");
        if (token) {
          const [cartRes, wishlistRes] = await Promise.all([
            fetch("http://localhost:5000/api/cart", {
              headers: { Authorization: `Bearer ${token}` }
            }),
            fetch("http://localhost:5000/api/wishlist", {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);

          // Process cart response
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            setCartItems(Array.isArray(cartData) ? cartData : cartData.cart || []);
          }

          // Process wishlist response
          if (wishlistRes.ok) {
            const wishlistData = await wishlistRes.json();
            setWishlistItems(Array.isArray(wishlistData) ? wishlistData : wishlistData.wishlist || []);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding to cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      setCartItems([...cartItems, { product_id: productId, quantity: 1 }]);
      setActionMsg("Added to cart!");
      setTimeout(() => setActionMsg(""), 1500);
    } catch (err) {
      console.error("Cart error:", err);
      setError(err.message);
    }
  };

  // Handle adding to wishlist
  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      setWishlistItems([...wishlistItems, { productId }]);
      setActionMsg("Added to wishlist!");
      setTimeout(() => setActionMsg(""), 1500);
    } catch (err) {
      console.error("Wishlist error:", err);
      setError(err.message);
    }
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some(item => item.product_id === productId);
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <section className={`min-h-screen text-black bg-white ${montserrat.variable} ${playfair.variable} container mx-auto px-4 py-12`}>
      <h1 className="text-4xl font-playfair mb-8 text-center">All Products</h1>
      
      {actionMsg && <div className="text-center text-green-600 mb-4">{actionMsg}</div>}
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white flex flex-col relative">
              <div className="relative aspect-square mb-4">
                <Image
                  src={getValidImageUrl(product.images)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority={false}
                />
                <button 
                  onClick={() => handleAddToWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition"
                  disabled={isInWishlist(product.id)}
                  title={isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                >
                  <svg 
                    className={`w-6 h-6 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-playfair mb-2">{product.name}</h2>
                <p className="text-gray-600 font-montserrat mb-2">₹{product.price}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    className={`flex-1 border px-6 py-2 text-sm transition font-montserrat ${
                      isInCart(product.id) 
                        ? "bg-gray-800 text-white border-gray-800" 
                        : "border-black hover:bg-black hover:text-white"
                    }`}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                  </button>
                  <button
                    className={`flex-1 border px-6 py-2 text-sm transition font-montserrat ${
                      isInWishlist(product.id)
                        ? "bg-red-500 text-white border-red-500"
                        : "border-black hover:bg-red-500 hover:text-white"
                    }`}
                    onClick={() => handleAddToWishlist(product.id)}
                    disabled={isInWishlist(product.id)}
                  >
                    {isInWishlist(product.id) ? "In Wishlist" : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="col-span-3 text-center text-gray-500">No products found.</div>
        )}
      </div>
    </section>
  );
}