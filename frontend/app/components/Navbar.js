"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const navItems = [
  { name: "Fragrance", href: "/products" },
  { name: "Makeup", href: "/products" },
  { name: "Skincare", href: "/products" },
  { name: "Hair", href: "/products" },
  { name: "Body & Bath", href: "/products" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Replace with real cart count

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 text-black">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="w-16" aria-label="BeauVie Home">
          <svg width="120" height="60" viewBox="0 0 200 100">
            <text x="50%" y="50%" fontFamily="serif" fontSize="40" fill="black" textAnchor="middle" dominantBaseline="middle">
              BeauVie
            </text>
          </svg>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-sm uppercase hover:text-gray-500 transition font-montserrat">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="relative" aria-label={`Shopping cart with ${cartItems} items`}>
            <Image src="/cart.svg" width={20} height={20} alt="Cart" />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-montserrat" aria-hidden="true">
                {cartItems}
              </span>
            )}
          </Link>
          <Link href="/wishlist" aria-label="Wishlist">
            <Image src="/wish.svg" width={20} height={20} alt="Wishlist" />
          </Link>
          <Link href="/profile" aria-label="Profile">
            <Image src="/profile.svg" width={28} height={28} alt="Profile" className="rounded-full border border-gray-300" />
          </Link>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={`mobile-${item.name}`}>
                <Link href={item.href} className="block uppercase py-2 font-montserrat" onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cart" className="block py-2 font-montserrat" onClick={() => setMobileMenuOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="block py-2 font-montserrat" onClick={() => setMobileMenuOpen(false)}>
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/profile" className="block py-2 font-montserrat" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
