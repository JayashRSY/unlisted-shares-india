import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { values } = await req.json(); // Expecting data in JSON format

        // Ensure values is an array of arrays
        const formattedValues = Array.isArray(values) && values.length > 0 ? [values] : [[values]]; // Wrap in an array if not already

        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT || '{}'),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const spreadsheetId = process.env.NEXT_PUBLIC_SHEET_ID; // Replace with your actual sheet ID
        const range = "transactions!A1"; // Adjust range as needed

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "RAW",
            requestBody: {
                values: formattedValues, // Use formatted values
            },
        });

        return NextResponse.json({ message: "Data inserted successfully!", response: response.data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 500 });
    }
}
