import { useEffect, useState } from "react";
import API from "../services/api";

export default function Lectures() {
  const [lectures, setLectures] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  const subjects = ["All", "Maths", "Physics", "Chemistry", "Biology"];

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const res = await API.get("/lectures");
      setLectures(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  // 🔥 FILTER LOGIC
  const filteredLectures = lectures.filter((lec) => {
    const matchSubject =
      selectedSubject === "All" || lec.subject === selectedSubject;

    const matchSearch = lec.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📚 Lectures</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search lectures..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-xl"
      />

      {/* 🎯 FILTER */}
      <div className="flex gap-3 flex-wrap">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedSubject === sub
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 📚 LECTURE LIST */}
      {filteredLectures.length === 0 ? (
        <p className="text-gray-500">No lectures found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredLectures.map((lec) => (
            <div
              key={lec._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">
                {lec.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {lec.subject}
              </p>

              <p className="text-sm text-gray-400 mb-3">
                ⏱ {lec.duration}
              </p>

              <button
                onClick={() => setActiveVideo(lec.videoUrl)}
                className="text-indigo-600 font-medium"
              >
                ▶ Watch Lecture
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🎥 VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black rounded-xl overflow-hidden w-[90%] max-w-4xl relative">

            {/* ❌ CLOSE */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white text-xl z-10"
            >
              ✖
            </button>

            {/* 🎥 YOUTUBE PLAYER */}
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo)}`}
              className="w-full h-[500px]"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>

          </div>
        </div>
      )}
    </div>
  );
}