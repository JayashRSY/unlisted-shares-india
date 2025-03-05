import { google } from "googleapis";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { EventEmitter } from 'events';

export const eventEmitter = new EventEmitter();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const fileEntry = formData.get("files") as File;

        if (!fileEntry) {
            return NextResponse.json({ status: "fail", message: "No file uploaded" });
        }

        const arrayBuffer = await fileEntry.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Read the XLSX file from the buffer
        const workbook = XLSX.read(buffer, { type: "buffer" });
        // Iterate over each sheet in the workbook
        for (const sheetName of workbook.SheetNames) {
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            await insertIntoSheet(jsonData, sheetName); // Pass sheetName to the function
        }

        // Emit an event to notify SSE about the new upload
        eventEmitter.emit('fileUploaded', { message: 'New file uploaded' });

        return NextResponse.json({ status: "success", data: 'Data Updated successfully' });
    } catch (e: unknown) {
        console.error("Error processing file:", e as Error);
        return NextResponse.json({ status: "fail", message: (e as Error).message });
    }
}

const precedenceList = ['P&L Statement', 'Assets', 'Cash-Flow Statement', 'Shareholding Pattern', '2021', '2022', '2024', '2024'];
function sortByPrecedence(arr: string[], precedenceList: string[]) {
    // Create a map to store precedence order for fast lookup
    const precedenceMap = new Map(precedenceList.map((item, index) => [item, index]));

    return arr.sort((a: string, b: string) => {
        const indexA = precedenceMap.has(a) ? precedenceMap.get(a) as number : Infinity;
        const indexB = precedenceMap.has(b) ? precedenceMap.get(b) as number : Infinity;
        return indexA - indexB;
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function insertIntoSheet(data: any[], sheetName: string) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT || '{}'),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Maintain the order of columns based on the first row of the data
        const columnOrder = sortByPrecedence(Object.keys(data[0]), precedenceList); // Assuming the first row defines the order
        const values = [columnOrder]; // Add headers in the specified order
        data.forEach((row) => {
            values.push(columnOrder.map((key: string) => row[key])); // Maintain order
        });
        const spreadsheetId = process.env.NEXT_PUBLIC_SHEET_ID;
        const range = `${sheetName}!A1`; // Use the sheetName for the range
        await sheets.spreadsheets.values.clear({
            spreadsheetId: spreadsheetId,
            range: `${sheetName}!A1:Z1000`,
        });
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "RAW",
            requestBody: {
                values,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Google Sheets API Error:", error);
        throw new Error("Failed to insert data into Google Sheets");
    }
}