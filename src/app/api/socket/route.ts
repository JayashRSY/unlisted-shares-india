import { NextRequest } from "next/server";
import { Server } from "socket.io";

export async function GET(req: NextRequest) {
  console.log("🚀 ~ GET ~ req:", req);
  if (!(global as any).io) {
    const io = new Server(3000, {
      path: "/api/socket", // Ensure WebSocket uses a custom path
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    (global as any).io = io;
    console.log("🔌 WebSocket Server Started on port 3000");
  }

  return new Response("WebSocket Server Ready", { status: 200 });
}
