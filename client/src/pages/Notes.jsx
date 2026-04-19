import { useEffect, useState } from "react";
import API from "../services/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [activePdf, setActivePdf] = useState(null);

  const subjects = ["All", "Maths", "Physics", "Chemistry", "Biology"];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 FILTER
  const filteredNotes = notes.filter((note) => {
    const matchSubject =
      selectedSubject === "All" || note.subject === selectedSubject;

    const matchSearch = note.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📄 Notes</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search notes..."
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
            className={`px-4 py-2 rounded-full text-sm ${
              selectedSubject === sub
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 📄 LIST */}
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h2 className="font-semibold text-lg mb-2">
                {note.title}
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                {note.subject}
              </p>

              <button
                onClick={() => setActivePdf(note.pdfUrl)}
                className="text-indigo-600 font-medium"
              >
                📖 View Notes
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 📄 PDF MODAL */}
      {activePdf && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-4xl h-[80vh] relative">

            {/* ❌ CLOSE */}
            <button
              onClick={() => setActivePdf(null)}
              className="absolute top-3 right-3 text-black text-xl z-10"
            >
              ✖
            </button>

            {/* 📄 PDF VIEW */}
            <iframe
              src={activePdf}
              className="w-full h-full rounded-xl"
              title="PDF Viewer"
            ></iframe>

          </div>
        </div>
      )}
    </div>
  );
}