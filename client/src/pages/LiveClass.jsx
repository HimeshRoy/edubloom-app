export default function LiveClass() {
  return (
    <div className="h-screen p-4">

      <h1 className="text-xl font-bold mb-4">Live Class 🎥</h1>

      <iframe
        src="https://meet.google.com/your-meet-link"
        className="w-full h-[80vh] rounded-xl"
        allow="camera; microphone; fullscreen"
      ></iframe>

    </div>
  );
}