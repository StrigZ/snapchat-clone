import "./WebcamCapture.css";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { RadioButtonUnchecked } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/camerSlice";
import { useNavigate } from "react-router-dom";
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};
const WebcamCapture = () => {
  const webcamRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcamRef]);
  return (
    <div className="webcam-capture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUnchecked
        className="webcam-capture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};
export default WebcamCapture;
