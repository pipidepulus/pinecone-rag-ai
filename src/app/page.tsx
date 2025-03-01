"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";

const Page: React.FC = () => {
  const [context, setContext] = useState<string[] | null>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const prevMessagesLengthRef = useRef(messages.length);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContext(null);
    handleSubmit(e);
  };

  useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({ messages }),
      });
      if (!response.ok) {
        console.error("Error al obtener el contexto:", response.statusText);
        return;
      }
      const { context } = await response.json();
      setContext(context.map((c: any) => c.id));
    };

    if (messages.length > prevMessagesLengthRef.current) {
      getContext();
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-800 p-2 mx-auto max-w-full">
      <Header className="my-5" />
      <div className="flex w-full flex-grow overflow-hidden relative">
        <Chat
          className="w-full h-full overflow-y-auto"
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleMessageSubmit}
          context={context}
        />
      </div>
    </div>
  );
};

export default Page;