"use client";
import Image from "next/image";
import logo from "../../public/usi_Logo.svg";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between p-6 px-20 backdrop-blur-lg sticky top-0">
      <Image src={logo} alt="logo" height={40}/>
      <div className="flex justify-evenly">
        <span className="px-5 text-gray-500 hover:text-black hover:cursor-pointer">Unlisted Shares</span>
        <span className="px-5 text-gray-500 hover:text-black hover:cursor-pointer">Our Blogs</span>
        <span className="px-5 text-gray-500 hover:text-black hover:cursor-pointer">Contact Us</span>
      </div>
    </div>
  );
};

export default Header;
