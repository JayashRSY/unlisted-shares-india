"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQItem = ({ faq }: { faq: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 w-full md:w-4/5 pb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left text-lg font-medium transition hover:cursor-pointer"
      >
        <span className="pt-3">{faq[0]}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4 text-gray-700"
      >
        {faq[1]}
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [data, setData] = useState<string[][] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetName = "faqs";
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SHEET_ID}/values/${sheetName}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        const result = await response.json();
        setData(result.values || []);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-medium text-center my-10 py-10">
        FAQ&apos;s
      </h1>
      <div className="flex flex-col items-center">
        {data?.map(
          (faq, index) => index > 0 && <FAQItem key={index} faq={faq} />
        )}
      </div>
    </div>
  );
};

export default FAQ;
