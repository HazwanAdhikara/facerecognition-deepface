from flask import Flask, request, jsonify
from deepface import DeepFace
import tempfile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if "img1" not in request.files or "img2" not in request.files:
        return jsonify({"error": "Please provide both img1 and img2"}), 400

    img1 = request.files["img1"]
    img2 = request.files["img2"]

    f1 = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    f1.write(img1.read()); f1.flush()

    f2 = tempfile.NamedTemporaryFile(delete=False, suffix=".jpg")
    f2.write(img2.read()); f2.flush()

    try:
        result = DeepFace.verify(
        f1.name,
        f2.name,
        model_name="VGG-Face",
        distance_metric="cosine",
        enforce_detection=True
    )
        distance = result["distance"]
        similarity = round((1 - distance) * 100, 2)
        verified = distance < 0.4 

        return jsonify({
            "distance": distance,
            "similarity": f"{similarity}%",
            "verified": verified
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000)
