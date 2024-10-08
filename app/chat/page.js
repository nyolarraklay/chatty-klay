"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import ChatSidebar from "../component/ChatSidebar";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import userAvatar from "../atom/userAvatar";
import { useRecoilState } from "recoil";
import { app, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { streamReader } from "openai-edge-stream";
import { v4 as uuid } from "uuid";
import Message from "../component/Message";

export default function Chat() {
  const [messageText, setMessageText] = useState("");
  const [userAvatarFile, setUserAvatarFile] = useRecoilState(userAvatar);
  const [newChatMessage, setNewChatMessage] = useState([]);
  const [incomingMessages, setIncomingMessages] = useState([]);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.auth.currentUser.providerData[0].uid;
        const unsubscribe = onSnapshot(
          query(collection(db, "users"), where("uid", "==", uid)),
          (snapshot) => {
            const userData = snapshot.docs.map((doc) => doc.data());
            setUserAvatarFile(userData[0] || null);
          },
        );
        return unsubscribe;
      } else {
        setUserAvatarFile(null);
      }
    });
  }, [db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewChatMessage((prev) => {
      const newChatMessage = [
        ...prev,
        {
          _id: uuid(),
          role: "user",
          content: messageText,
        },
      ];

      return newChatMessage;
    });
    const response = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    });
    const data = response.body;

    if (!data) {
      return;
    }
    const reader = data.getReader();
    await streamReader(reader, (message) => {
      setIncomingMessages((prevMessages) => [...prevMessages, message.content]);
    });
  };

  return (
    <>
      <Head>
        <title>New Chat</title>
        <meta name="description" content="Ask chatty-klay anything" />
      </Head>

      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-gray-700 flex flex-col flex-1">
          <div className="flex-1">
            {newChatMessage.map((message) => (
              <Message
                key={message._id}
                role={message.role}
                content={message.content}
              />
            ))}
            {!!incomingMessages && (
              <Message role="assistant" content={incomingMessages} />
            )}
          </div>
          <footer className="bg-gray-800 p-10">
            <form onSubmit={handleSubmit}>
              <fieldset className="flex gap-2">
                <textarea
                  className="w-full resize-none rounded-md bg-gray-700 p-2 focus:border-emerald-500 focus:bg-gray-600 focus:outline-emerald-500 text-white"
                  placeholder="send message ..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                >
                  Send
                </button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  );
}
