from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import os

app = Flask(__name__)

# Load model once (startup pe)
model = YOLO("yolov8n.pt")


# 🔥 Health check route (IMPORTANT for Render)
@app.route("/")
def home():
    return "AI Server Running 🚀"


# 🔥 Detection API
@app.route("/detect", methods=["POST"])
def detect():
    try:
        file = request.files["image"]

        img = cv2.imdecode(
            np.frombuffer(file.read(), np.uint8),
            cv2.IMREAD_COLOR
        )

        results = model(img)

        mobile = False

        for r in results:
            for box in r.boxes:
                cls = int(box.cls[0])
                label = model.names[cls]

                if label == "cell phone":
                    mobile = True

        return jsonify({"mobile_detected": mobile})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 🔥 Render compatible run
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
    print("🔥 AI SERVER STARTED")