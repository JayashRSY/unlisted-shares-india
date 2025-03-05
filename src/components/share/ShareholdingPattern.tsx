"use client";
import React, { useEffect, useState } from "react";
import Table from "../Table";

const ShareholdingPattern = () => {
  const [data, setData] = useState<string[][] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sheetName = "Shareholding_pattern";
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
    const eventSource = new EventSource("/api/sse");
    eventSource.onmessage = (event) => {
      const sseRes = JSON.parse(event.data);
      console.log("New Event:", sseRes);
      if (sseRes?.message === "New file uploaded") {
        fetchData();
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium my-4 py-2 mt-10">
        Shareholding Pattern
      </h1>
      {data && <Table data={data} />}
    </div>
  );
};

export default ShareholdingPattern;
