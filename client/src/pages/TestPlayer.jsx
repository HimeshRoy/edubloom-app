import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import * as faceapi from "face-api.js";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

export default function TestPlayer() {
  const { id } = useParams();
  const socketRef = useRef(null);
  const [test, setTest] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [flags, setFlags] = useState(0);
  const [cheatScore, setCheatScore] = useState(0);
  let lastFace = useRef(null);
  const videoRef = useRef(null);
  const prevFrame = useRef(null);
  const lastFlagTime = useRef(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
 const AI_URL = import.meta.env.VITE_AI_URL;

  useEffect(() => {
    const load = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      console.log("Model loaded");
    };

    load();
  }, []);

  useEffect(() => {
    socketRef.current = io("https://edubloom-app.onrender.com");

    return () => socketRef.current.disconnect();
  }, []);

  // 🔥 LOAD TEST
  useEffect(() => {
    API.get(`/tests/${id}`).then((res) => {
      setTest(res.data);
      setTimeLeft(res.data.duration * 60);
    });
  }, []);

  // ⏱ TIMER
  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // 🔒 FULLSCREEN FORCE
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(() => {});

    const exit = () => {
      if (!document.fullscreenElement) {
        addFlag("Fullscreen exited");
      }
    };

    document.addEventListener("fullscreenchange", exit);

    return () => document.removeEventListener("fullscreenchange", exit);
  }, []);

  // 🚫 BLOCK COPY/PASTE
  useEffect(() => {
    const block = (e) => e.preventDefault();

    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    document.addEventListener("contextmenu", block);

    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
      document.removeEventListener("contextmenu", block);
    };
  }, []);

  // ⚠️ TAB SWITCH
  useEffect(() => {
    const handleBlur = () => addFlag("Tab switch detected");

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  // 📷 CAMERA
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        alert("Camera required");
        submitTest();
      });
  }, []);

  // 🔥 MOVEMENT DETECTION
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      if (!videoRef.current) return;

      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (prevFrame.current) {
        let diff = 0;

        for (let i = 0; i < frame.data.length; i += 4) {
          diff += Math.abs(frame.data[i] - prevFrame.current.data[i]);
        }

        if (diff > 7000000) {
          addFlag("Suspicious movement");
        }
      }

      prevFrame.current = frame;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blockKeys = (e) => {
      if (e.ctrlKey && ["c", "v", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        handleCheating("Blocked shortcut", 1);
      }

      if (e.key === "F12") {
        e.preventDefault();
        handleCheating("DevTools blocked", 2);
      }
    };

    window.addEventListener("keydown", blockKeys);

    return () => window.removeEventListener("keydown", blockKeys);
  }, []);

  // 🔥 FLAG SYSTEM
  const handleCheating = (msg, score) => {
    const now = Date.now();

    if (now - lastFlagTime.current < 5000) return;

    lastFlagTime.current = now;

    toast.error(msg);

    setFlags((prev) => prev + 1);

    socketRef.current.emit("cheating_event", {
      user: user.name,
      message: msg,
      score: score,
      time: new Date(),
    });

    setCheatScore((prev) => {
      const newScore = prev + score;

      if (newScore >= 10) {
        alert("🚨 Auto submit due to cheating");
        submitTest();
      }

      return newScore;
    });
  };

  // camera
  const sendFrame = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);

    const img = canvas.toDataURL("image/jpeg");

    socketRef.current.emit("video_frame", {
      user: user.name,
      frame: img,
    });
  };

  useEffect(() => {
    const interval = setInterval(sendFrame, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🚀 SUBMIT
  const submitTest = async () => {
    await API.post("/tests/submit", {
      testId: id,
      answers,
      userId: user._id,
      flags,
    });

    alert("Test submitted");
    const res = await API.post("/tests/submit", {
      testId: id,
      answers,
      userId: user._id,
    });

    navigate(`/result/${res.data.resultId}`);
  };

  if (!test) return <p className="p-6">Loading...</p>;

  const q = test.questions[current];

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // detectMobile
  const detectMobile = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg"),
    );

    const formData = new FormData();
    formData.append("image", blob);

    try {
      const res = await fetch(`${AI_URL}/detect`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.mobile_detected) {
        handleCheating("📱 Mobile detected", 4);
      }
    } catch (err) {
      console.log("AI error", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectMobile();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions(),
      );

      // ❌ No face
      if (detections.length === 0) {
        handleCheating("No face detected", 2);
      }

      // ❌ Multiple faces
      if (detections.length > 1) {
        handleCheating("Multiple faces detected", 3);
      }

      // ✅ Single face
      if (detections.length === 1) {
        const face = detections[0].box;

        // 📱 LOOK DOWN (mobile usage)
        if (face.y > videoRef.current.videoHeight * 0.6) {
          handleCheating("Looking down (mobile?)", 2);
        }

        // 🧠 MOVEMENT DETECTION
        if (lastFace.current) {
          const move = Math.abs(face.x - lastFace.current.x);

          if (move > 80) {
            handleCheating("Sudden movement", 1);
          }
        }

        lastFace.current = face;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendFrameToAI = async (image) => {
  try {
    const res = await fetch(`${AI_URL}/detect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    const data = await res.json();

    if (data.cheating) {
      console.log("Cheating detected");
    }
  } catch (err) {
    console.log("AI error", err);
  }
};

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT */}
      <div className="flex-1 p-6 flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between bg-blue-600 text-white p-3 rounded">
          <div>{test.title}</div>
          <div>⏱ {formatTime()}</div>
        </div>

        {/* QUESTION */}
        <div className="bg-white p-6 mt-4 rounded shadow flex-1">
          <h2 className="mb-3 font-semibold">Q{current + 1}</h2>

          <p>{q.question}</p>

          {q.image && <img src={q.image} className="w-60 mt-3" />}

          <div className="space-y-3 mt-4">
            {q.options.map((opt, i) => (
              <div
                key={i}
                onClick={() => selectOption(i)}
                className={`p-3 border rounded cursor-pointer ${
                  answers[current] === i ? "bg-blue-200" : "bg-gray-100"
                }`}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>

        {/* NAV */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setCurrent(current - 1)}
            className="bg-gray-400 px-4 py-2 rounded text-white"
          >
            Prev
          </button>

          <button
            onClick={() => setCurrent(current + 1)}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Next
          </button>

          <button
            onClick={submitTest}
            className="bg-green-600 px-4 py-2 rounded text-white"
          >
            Submit
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-72 bg-white p-4 overflow-y-auto">
        <div className="grid grid-cols-5 gap-2">
          {test.questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-2 text-center rounded cursor-pointer ${
                answers[i] !== undefined ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* CAMERA */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className="fixed bottom-4 right-4 w-32 h-24 border rounded"
      />
    </div>
  );
}
