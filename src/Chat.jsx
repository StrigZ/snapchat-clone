import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Chat.css";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openChat = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      updateDoc(doc(db, "posts", id), {
        read: true,
      });
      navigate("/chats/view");
    }
  };
  return (
    <div className="chat" onClick={openChat}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && `Tap to view - `}
          <TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
};
export default Chat;
