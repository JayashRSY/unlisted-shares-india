"use client";
import Image from "next/image";
import logo from "../../public/usi_Logo.svg";
import React from "react";

const Footer = () => {
  return (
    <div className=" bg-gray-100 py-30 mt-20">
      <div className="flex justify-between p-6 px-20 border-t-gray-500 bg-gray-100">
        <Image src={logo} alt="logo" height={40} />
        <div className="flex justify-evenly">
          <span className="px-5 text-gray-500 hover:text-black hover:cursor-pointer">
            Terms & Condition
          </span>
          <span className="px-5 text-gray-500 hover:text-black hover:cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
      <div className="border-t border-gray-300 text-center text-gray-500 pt-10 mx-20">
        © 2024. Unlisted Shares India. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
