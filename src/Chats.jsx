import { ChatBubble, RadioButtonUnchecked, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Chats.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/camerSlice";
const Chats = () => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

  const [postsSnapshot, loading] = useCollection(q);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <div onClick={logout}>
          <Avatar
            className="chats__header-avatar"
            referrerPolicy="no-referrer"
            src={user.profilePic}
          />
        </div>
        <div className="chats__header-search">
          <Search className="chats__header-searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble className="chats__header-chatIcon" />
      </div>
      <div className="chats__posts">
        {/* Loop trough posts from db */}
        {loading && <h1 className="chats__loading">Loading...</h1>}
        {postsSnapshot &&
          postsSnapshot.docs.map((doc) => {
            const { id } = doc;
            const { profilePic, username, timestamp, imageUrl, read } =
              doc.data();
            return (
              <Chat
                key={id}
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

      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};
export default Chats;
