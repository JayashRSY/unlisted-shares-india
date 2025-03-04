"use client";
// import Image from "next/image";
import React, { useState } from "react";

const BuyAndSell = () => {
  const [selectedTab, setSelectedTab] = useState<string>("buy");
  //   const [countries, setCountries] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    // region: "",
    quantity: 1,
    message: "",
  });

  //   useEffect(() => {
  //     const fetchCountries = async () => {
  //       try {
  //         const response = await fetch('https://www.apicountries.com/countries');
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         console.log("🚀 ~ fetchCountries ~ response:", data);
  //         setCountries(data);
  //       } catch (error) {
  //         console.error("Error fetching country data:", error);
  //       }
  //     };

  //     fetchCountries();
  //   }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.quantity ||
      !formData.message
    ) {
      alert("Missing form fields");
      return;
    }
    console.log("🚀 ~ handleSubmit ~ formData:", formData);
    const rowData = [];
    Object.values(formData).forEach((field) => {
      rowData.push(field);
    });
    rowData.push(selectedTab);
    console.log("🚀 ~ handleSubmit ~ rowData:", rowData);
    const res = fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values: rowData }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error("Error:", err));
    console.log("🚀 ~ handleSubmit ~ res:", res);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md border-gray-200">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`p-2 font-medium w-full  hover:cursor-pointer ${
            selectedTab === "buy"
              ? "text-green-500 border-b border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("buy")}
        >
          Buy
        </button>
        <button
          className={`p-2 font-medium w-full  hover:cursor-pointer ${
            selectedTab === "sell"
              ? "text-green-500 border-b border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("sell")}
        >
          Sell
        </button>
      </div>
      <div>
        <p className="text-lg font-medium my-2">
          Chennai Super Kings (CSK) Shares
        </p>
        <p className="text-gray-500 mb-4">
          {selectedTab === "buy" ? "₹192" : "* Best In Industry"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        <div className="flex gap-2">
          {/* <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2 flex-1/5"
          >
            {" "}
            {countries?.map((country: any) => (
              <option
                key={country.callingCodes[0]}
                value={country.callingCodes[0]}
              >
                <Image
                  src={country.flags.svg}
                  alt={`${country.name} flag`}
                  style={{ width: "20px", marginRight: "5px" }}
                />
                {country.name} ({country.callingCodes[0]})
              </option>
            ))}
          </select> */}
          <input
            type="tel"
            placeholder="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded p-2 flex-4/5"
          />
        </div>
        <input
          type="number"
          placeholder="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600 cursor-pointer"
        >
          {selectedTab === "buy" ? "Buy" : "Sell"}
        </button>
      </form>
    </div>
  );
};

export default BuyAndSell;
