"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Playfair_Display, Montserrat } from 'next/font/google';

// Font definitions
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function BeauVieHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);

  const navItems = [
    { name: "Fragrance", href: "#" },
    { name: "Makeup", href: "#" },
    { name: "Skincare", href: "#" },
    { name: "Hair", href: "#" },
    { name: "Body & Bath", href: "#" },
  ];

  const heroProducts = [
    { id: 1, name: "Éclat Lumière", price: 98, category: "Serum", bestseller: true },
    { id: 2, name: "Rouge Velours", price: 42, category: "Lipstick", new: true },
    { id: 3, name: "Nuit Étoilée", price: 85, category: "Fragrance", limited: true }
  ];

  const collections = [
    { id: 1, name: "Summer Glow", description: "Radiant essentials for sun-kissed skin" },
    { id: 2, name: "Parisian Chic", description: "Timeless elegance in every drop" },
    { id: 3, name: "Clean Beauty", description: "Pure formulas for conscious beauty" }
  ];

  const testimonials = [
    { 
      quote: "BeauVie transformed my skincare routine completely", 
      author: "Sophie Martin", 
      role: "Beauty Editor" 
    },
    { 
      quote: "The most luxurious textures I've ever experienced", 
      author: "Léa Dubois", 
      role: "Makeup Artist" 
    }
  ];

  return (
    <div className={`min-h-screen bg-white  ${montserrat.variable} ${playfair.variable}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 text-black" >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="w-16">
          <svg width="120" height="60" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <text x="50%" y="50%" font-family="serif" font-size="40" fill="black" text-anchor="middle" dominant-baseline="middle">
    BeauVie
  </text>
</svg>
          </a>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm uppercase hover:text-gray-500 transition font-montserrat">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-6">
            <a href="#" className="hidden md:block">
              <Image src="/search-icon.svg" width={16} height={16} alt="Search" />
            </a>
            <a href="#" className="relative">
              <Image src="/cart-icon.svg" width={16} height={16} alt="Cart" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-montserrat">
                  {cartItems}
                </span>
              )}
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={`mobile-${item.name}`}>
                  <a href={item.href} className="block uppercase py-2 font-montserrat">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] text-black">
        <Image
          src="/BeauVie-hero.jpg"
          fill
          className="object-cover object-center"
          alt="BeauVie Hero"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center">
          <div className="container mx-auto px-4 text-white">
            <h1 className={`text-4xl md:text-6xl mb-6 max-w-xl font-playfair`}>
              French Elegance, Modern Beauty
            </h1>
            <p className="text-lg mb-8 max-w-lg font-montserrat">
              Discover our new collection of timeless beauty essentials
            </p>
            <a 
              href="#products" 
              className="inline-block border border-white px-8 py-3 hover:bg-white hover:text-black transition font-montserrat"
            >
              Explore Now
            </a>
          </div>
        </div>
      </section>

      {/* Signature Products */}
      <section id="products" className="py-20 container mx-auto px-4 text-black">
        <div className="text-center mb-16">
          <h2 className={`text-3xl mb-4 font-playfair`}>Our Signature Creations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Meticulously crafted with the finest ingredients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heroProducts.map((product) => (
            <article key={product.id} className="group">
              <div className="relative aspect-square mb-4 overflow-hidden">
                <Image
                  src={`/product-${product.id}.jpg`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  alt={product.name}
                />
                <div className="absolute top-4 left-4">
                  {product.bestseller && (
                    <span className="bg-white text-black px-3 py-1 text-xs font-montserrat">BESTSELLER</span>
                  )}
                  {product.new && (
                    <span className="bg-white text-black px-3 py-1 text-xs font-montserrat">NEW</span>
                  )}
                  {product.limited && (
                    <span className="bg-white text-black px-3 py-1 text-xs font-montserrat">LIMITED</span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500 font-montserrat">{product.category}</span>
                <h3 className={`text-xl mb-2 font-playfair`}>{product.name}</h3>
                <p className="text-gray-900 font-montserrat">${product.price}</p>
                <button 
                  className="mt-4 border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition font-montserrat"
                  onClick={() => setCartItems(c => c + 1)}
                >
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl mb-4 font-playfair`}>Curated Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
              Perfectly paired products for every beauty need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div key={collection.id} className="relative group overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={`/collection-${collection.id}.jpg`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    alt={collection.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <h3 className={`text-2xl text-white mb-1 font-playfair`}>{collection.name}</h3>
                    <p className="text-white/80 font-montserrat">{collection.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl mb-4 font-playfair`}>As Seen In</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
              What beauty experts are saying about BeauVie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className={`text-xl mb-6 italic font-playfair`}>"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium font-montserrat">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm font-montserrat">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gray-50 text-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <h2 className={`text-3xl mb-6 font-playfair`}>The BeauVie Story</h2>
            <p className="text-gray-600 mb-6 font-montserrat">
              Founded in 2025, BeauVie combines French beauty traditions with modern, clean formulations. 
              Our products are developed by leading dermatologists and perfumers to deliver uncompromising quality.
            </p>
            <p className="text-gray-600 mb-8 font-montserrat">
              Each ingredient is carefully selected for its efficacy and sustainability, because true beauty 
              should be both luxurious and responsible.
            </p>
            <button className="border border-black px-8 py-3 hover:bg-black hover:text-white transition font-montserrat">
              Discover Our Philosophy
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="relative aspect-square">
              <Image
                src="/brand-story.jpg"
                fill
                className="object-cover"
                alt="BeauVie Story"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className={`text-3xl mb-6 font-playfair`}>Join Our World</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto font-montserrat">
            Subscribe for exclusive offers, beauty tips, and early access to new collections
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 bg-transparent border border-white placeholder-gray-400 font-montserrat"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-white text-black hover:bg-gray-200 transition font-montserrat"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 font-montserrat">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`text-lg mb-4 font-playfair`}>Customer Care</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Shipping</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg mb-4 font-playfair`}>About BeauVie</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Our Story</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Sustainability</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Ingredients</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg mb-4 font-playfair`}>Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Terms</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Privacy</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Accessibility</a></li>
              <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className={`text-lg mb-4 font-playfair`}>Connect</h3>
            <div className="flex space-x-4 mb-6">
              {['facebook', 'instagram', 'pinterest', 'tiktok'].map((social) => (
                <a key={social} href="#" className="hover:opacity-75 transition">
                  <Image 
                    src={`/${social}-icon.svg`} 
                    width={20} 
                    height={20} 
                    alt={social} 
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-montserrat">
              Sign up for our newsletter
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 font-montserrat">
            © {new Date().getFullYear()} BeauVie. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}