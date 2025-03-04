import React from "react";
import Image from "next/image";
import cskIcon from "../../public/csk.avif";

const Title = () => {
  return (
    <div className="pb-10 mt-10">
      <Image src={cskIcon} alt="logo" height={100} />

      <h2 className="py-4 text-3xl font-medium text-gray-800">Chennai Super Kings (CSK) Share Price</h2>
      <div className="flex align-baseline">
        <p className="text-2xl font-bold pe-5 flex align-middle">₹192</p>
        <p className="text-red-700 pe-4">0</p>
        <p className="text-red-700 px-4">0%</p>
        <p className="text-gray-700">2M</p>
      </div>
    </div>
  );
};

export default Title;
