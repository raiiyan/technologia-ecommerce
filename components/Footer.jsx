import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
        
        {/* Logo + Description */}
        <div>
          <Image src={assets.logo} alt="Site Logo" className="w-32 mb-4" />
          <p>
            Your trusted e-commerce destination for quality products, fast delivery, and secure checkout. Experience shopping like never before.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-gray-900 font-semibold text-base mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-gray-900 font-semibold text-base mb-4">Get in Touch</h2>
          <ul className="space-y-2">
            <li>📞 +880 1234567890</li>
            <li>✉️ support@technologia.com</li>
            <li>📍 Time Square, Narsingdi, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Technologia Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
