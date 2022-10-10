import { ChatBubble, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";
import "./Chats.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import Chat from "./Chat";
const Chats = () => {
  const [postsSnapshot, loading] = useCollection(
    collection(db, "posts"),
    orderBy("timestamp", "desc")
  );
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__header-avatar" />
        <div className="chats__header-search">
          <Search />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats__header-chatIcon" />
      </div>
      <div className="chats__posts">
        {/* Loop trough posts from db */}
        {loading && <h1>Loading...</h1>}
        {postsSnapshot &&
          postsSnapshot.docs.map((doc) => {
            const { id } = doc;
            const { profilePic, username, timestamp, imageUrl, read } =
              doc.data();
            return (
              <Chat
                id={id}
                profilePic={profilePic}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Chats;
