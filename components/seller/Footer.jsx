import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image className="w-28 md:block hidden" src={assets.logo} alt="logo" />
          <div className="hidden md:block h-6 w-px bg-gray-400/50"></div>
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
            © 2025 technologia ltd. — All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Facebook">
            <Image src={assets.facebook_icon} alt="facebook_icon" className="w-5 h-5 hover:scale-110 transition" />
          </a>
          <a href="#" aria-label="Twitter">
            <Image src={assets.twitter_icon} alt="twitter_icon" className="w-5 h-5 hover:scale-110 transition" />
          </a>
          <a href="#" aria-label="Instagram">
            <Image src={assets.instagram_icon} alt="instagram_icon" className="w-5 h-5 hover:scale-110 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
