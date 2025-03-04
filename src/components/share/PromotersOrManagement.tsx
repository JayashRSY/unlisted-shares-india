"use client";
import React, { useEffect, useState } from "react";
import Table from "../Table";

const PromotersOrManagement = () => {
  const [data, setData] = useState<string[][] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetName = "promoters";
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SHEET_ID}/values/${sheetName}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        const result = await response.json();
        setData(result.values || []);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium my-4 py-2 mt-10">
        Promoters Or Management
      </h1>
      {data && <Table data={data} />}
    </div>
  );
};

export default PromotersOrManagement;
