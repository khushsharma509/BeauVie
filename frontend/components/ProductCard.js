"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      <Image
        src={product.image}
        width={400}
        height={500}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-playfair mb-2">{product.name}</h3>
        <p className="text-gray-600 font-montserrat mb-4">${product.price}</p>
        <div className="flex gap-4">
          <button className="bg-black text-white px-4 py-2 rounded flex-1">
            Add to Cart
          </button>
          <button className="border border-black px-4 py-2 rounded flex-1">
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
