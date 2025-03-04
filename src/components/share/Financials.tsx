"use client";
import React, { useEffect, useState } from "react";
import Table from "../Table";

const Financials = () => {
  const [incomeStatementData, setIncomeStatementData] = useState<
    string[][] | null
  >(null);
  const [balanceSheetData, setBalanceSheetData] = useState<string[][] | null>(
    null
  );
  const [cashFlowData, setCashFlowData] = useState<string[][] | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("incomeStatement");

  useEffect(() => {
    const fetchData = async (sheetName: string) => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.NEXT_PUBLIC_SHEET_ID}/values/${sheetName}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        const result = await response.json();
        if (sheetName === "income_statements") {
          setIncomeStatementData(result.values || []);
        } else if (sheetName === "balance_sheet") {
          setBalanceSheetData(result.values || []);
        } else if (sheetName === "cash_flow") {
          setCashFlowData(result.values || []);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const intervalId = setInterval(() => {
      fetchData("income_statements");
      fetchData("balance_sheet");
      fetchData("cash_flow");
    }, 5000); // Polling every 5 seconds

    // Initial fetch
    fetchData("income_statements");
    fetchData("balance_sheet");
    fetchData("cash_flow");

    // return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium my-4 py-2 mt-10">
        Financials<span className="text-gray-500"> (In Cr)</span>
      </h1>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <button
            className={`p-2 font-medium w-full  hover:cursor-pointer ${
              selectedTab === "incomeStatement"
                ? "text-green-500 border-b border-green-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("incomeStatement")}
          >
            Income Statement
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`p-2 font-medium w-full  hover:cursor-pointer ${
              selectedTab === "balanceSheet"
                ? "text-green-500 border-b border-green-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("balanceSheet")}
          >
            Balance Sheet
          </button>
        </div>
        <div className="flex-1">
          <button
            className={`p-2 font-medium w-full hover:cursor-pointer ${
              selectedTab === "cashFlow"
                ? "text-green-500 border-b border-green-500"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("cashFlow")}
          >
            Cash Flow
          </button>
        </div>
      </div>
      {selectedTab === "incomeStatement" && incomeStatementData && (
        <Table data={incomeStatementData} />
      )}
      {selectedTab === "balanceSheet" && balanceSheetData && (
        <Table data={balanceSheetData} />
      )}
      {selectedTab === "cashFlow" && cashFlowData && (
        <Table data={cashFlowData} />
      )}
    </div>
  );
};

export default Financials;
