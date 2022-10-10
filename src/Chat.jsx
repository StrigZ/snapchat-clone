import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Chat.css";
import ReactTimeAgo from "react-time-ago";
import { useDispatch } from "react-redux";
import { selectCameraImage } from "./features/camerSlice";
const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const dispatch = useDispatch();
  const openChat = () => {
    if (!read) {
      dispatch(selectCameraImage);
    }
  };
  return (
    <div className="chat" onClick={openChat}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <ReactTimeAgo
            date={new Date(timestamp?.toDate()).toUTCString()}
            locale="ru-Ru"
          />{" "}
          {}
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
};
export default Chat;
