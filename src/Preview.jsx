import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextFields,
  Create,
  Note,
  MusicNote,
  AttachFile,
  Crop,
  Timer,
  Send,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/camerSlice";
import { Close } from "@mui/icons-material";
import "./Preview.css";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { db, storage } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  const sendPost = () => {
    const id = uuidv4();

    const storageRef = ref(storage, `posts/${id}.jpg`);
    uploadString(storageRef, cameraImage, "data_url")
      .catch((e) => console.log(e.message))
      .then((data) => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "posts"), {
            imageUrl: url,
            username: "Sonny",
            read: false,
            //pfp
            timestamp: serverTimestamp(),
          });
        });
      });

    navigate("/");
  };
  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, []);
  return (
    <div className="preview">
      <Close className="preview__close" onClick={closePreview} />
      <div className="preview__toolbar-right">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <Send className="preview__send-icon" />
      </div>
    </div>
  );
};
export default Preview;
