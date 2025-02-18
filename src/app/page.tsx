// page.tsx

"use client";

//import React, { useEffect, useRef, useState, FormEvent } from "react";
import React, { useState, FormEvent } from "react";
//import { Context } from "@/components/Context";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";
import InstructionModal from "./components/InstructionModal";
import { AiFillGithub, AiOutlineInfoCircle } from "react-icons/ai";

const Page: React.FC = () => {
  //const [gotMessages, setGotMessages] = useState(false);
  //const [context, setContext] = useState<string[] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  //const { messages, input, handleInputChange, handleSubmit } = useChat({
  //  onFinish: async () => {
  //    setGotMessages(true);
  //  },
  //});
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  //const prevMessagesLengthRef = useRef(messages.length);

  //const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //  e.preventDefault();
  //  handleSubmit(e);
  //  setContext(null);
  //  setGotMessages(false);
  //};

  //useEffect(() => {
  //  const getContext = async () => {
  //    const response = await fetch("/api/context", {
  //      method: "POST",
  //      body: JSON.stringify({
  //        messages,
  //      }),
  //    });
  //    const { context } = await response.json();
  //    setContext(context.map((c: any) => c.id));
  //  };
  //  if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
  //    getContext();
  //  }

  //  prevMessagesLengthRef.current = messages.length;
  //}, [messages, gotMessages]);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-800 p-2 mx-auto max-w-full">
      <Header className="my-5" />
   
      <InstructionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="flex w-full flex-grow overflow-hidden relative">
        <Chat
          input={input}
          handleInputChange={handleInputChange}
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
        />
        
        
        <button
          type="button"
          className="absolute left-20 transform -translate-x-12 bg-gray-800 text-white rounded-l py-2 px-4 lg:hidden"
          onClick={(e) => {
            e.currentTarget.parentElement
              ?.querySelector(".transform")
              ?.classList.toggle("translate-x-full");
          }}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Page;
