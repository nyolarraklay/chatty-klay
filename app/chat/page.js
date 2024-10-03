import Head from "next/head";
import React from "react";
import ChatSidebar from "../component/ChatSidebar";

export default function Chat() {
  return (
    <>
      <Head>
        <title>New Chat</title>
        <meta name="description" content="Ask chatty-klay anything" />
      </Head>

      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-gray-700 flex flex-col flex-1">
          <div className=" flex-1">Chat</div>
          <footer className="bg-gray-800 p-10">Footer</footer>
        </div>
      </div>
    </>
  );
}
