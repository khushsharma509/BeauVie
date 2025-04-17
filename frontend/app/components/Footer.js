import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100 text-black mt-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg mb-4 font-playfair">Customer Care</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Contact Us</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">FAQs</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Shipping</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Returns</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg mb-4 font-playfair">About BeauVie</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Our Story</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Sustainability</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Ingredients</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg mb-4 font-playfair">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Terms</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Privacy</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Accessibility</a></li>
            <li><a href="#" className="text-sm hover:text-gray-500 transition font-montserrat">Cookies</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg mb-4 font-playfair">Connect</h3>
          <div className="flex space-x-4 mb-6">
            {['facebook', 'instagram', 'pinterest', 'tiktok'].map((social) => (
              <a key={social} href="#" className="hover:opacity-75 transition" aria-label={`Follow us on ${social}`}>
                <Image src={`/${social}-icon.svg`} width={20} height={20} alt={social} className="w-5 h-5" />
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
  );
}
