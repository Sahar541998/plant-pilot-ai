import datetime
import os
import requests
from langchain_core.tools import tool
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
PLANTNET_API_KEY = os.getenv("PLANTNET_API_KEY")

@tool
def get_time() -> str:
    """Returns the current time."""
    return str(datetime.now())


@app.route("/isalive", methods=["GET"])
def is_alive():
    return jsonify({"status": "alive"})

@app.route("/plants", methods=["POST"])
def plants():
    # Extract JSON payload from request
    data = request.get_json()

    # Extract the fields you expect (adjust according to your client)
    image_base64 = data.get("image_base64")
    url = f"https://my-api.plantnet.org/v2/identify/all?api-key={PLANTNET_API_KEY}"

    payload = {
        "images": [image_base64],
        "organs": ["leaf"],
        "include-related-images": False
    }
    headers = {"Content-Type": "application/json"}

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        results = response.json().get('results', [])
        for i, result in enumerate(results[:3]):
            species = result["species"]
            score = result["score"]
            print(f"{i+1}. {species['scientificNameWithoutAuthor']} ({score:.2%})")
        return jsonify({"status": "ok", "result": "ok"})

    else:
        print(f"Error {response.status_code}: {response.text}")
        # Return dummy response for now
        return jsonify({"status": "error"})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
    print("Server is running on port 5000")