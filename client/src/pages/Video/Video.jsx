import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Video = () => {
  const [url, setUrl] = useState("");
  const webcamref = useRef(null);
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      video: true,
    });

  const handleStartRecording = () => {
    console.log("started");
    startRecording();
  };

  const handleStopRecording = () => {
    console.log("stopped", mediaBlobUrl);
    stopRecording();
    setUrl(mediaBlobUrl);
    uploadToFirebase(mediaBlobUrl);
    uploadToDatabase();
  };

  const uploadToDatabase = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/upload",
        {
          url,
        },
        {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToFirebase = (blob) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_video.mp4`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing happened");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <Webcam ref={webcamref} />
      {status === "recording" ? (
        <>
          <h1>
            The Video will start uploading to cloud Server once you stop
            recording
          </h1>
          <button onClick={handleStopRecording}>Stop Recording</button>
        </>
      ) : (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
    </div>
  );
};

export default Video;
