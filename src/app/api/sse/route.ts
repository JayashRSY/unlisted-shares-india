import { NextRequest } from "next/server";
import { eventEmitter } from "../upload/route";

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (data: any) =>
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);

      eventEmitter.on("fileUploaded", sendEvent);
      req.signal.addEventListener("abort", () => {
        eventEmitter.off("fileUploaded", sendEvent);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
