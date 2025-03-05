"use client";

import { useEffect } from "react";

export default function ChatPage() {
  useEffect(() => {
    const eventSource = new EventSource("/api/sse");
    console.log("🚀 ~ useEffect ~ eventSource:", eventSource);

    eventSource.onmessage = (event) => {
      console.log("New Event:", JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  const sendMessage = () => {
    const mm = "hi";
    console.log("🚀 ~ sendMessage ~ mm:", mm);
  };

  return (
    <button
      className="w-full bg-blue-500 text-white p-2 mt-2 rounded"
      onClick={sendMessage}
    >
      Send
    </button>
  );
}
