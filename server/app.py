import base64
import datetime
import io
import os
from tkinter import Image
from PIL import Image

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


@app.route("/detect", methods=["POST"])
def plants():
    # Extract JSON payload from request
    data = request.get_json()
    print("polo")

    # Extract the fields you expect (adjust according to your client)
    image_base64 = data.get("image_base64")

    # Add this logic to prevent fetch from api on testing
    if(True):
        return jsonify({{"results": [{"common_names": ["aa"], "family": "Aizoaceae", "genus": "Delosperma", "image_url": "https://bs.plantnet.org/image/s/d3ca6b8e0f64329a1c8a00a930c645995fc6d323", "match_percentage": 33.16, "name": "Delosperma cooperi (Hook.f.) L.Bolus", "pretty_name": "Delosperma cooperi"}, {"common_names": ["1"], "family": "Aizoaceae", "genus": "Malephora", "image_url": "https://bs.plantnet.org/image/s/4d5134499b97c16cf5efc3bd419c73265ac5882a", "match_percentage": 12.71, "name": "Malephora crocea (Jacq.) Schwantes", "pretty_name": "Malephora crocea"}, {"common_names": ["1"], "family": "Aizoaceae", "genus": "Lampranthus", "image_url": "https://bs.plantnet.org/image/s/2bcd4078a7aaa5bef146555b44892756afa2ecf7", "match_percentage": 7.32, "name": "Lampranthus multiradiatus (Jacq.) N.E.Br.", "pretty_name": "Lampranthus multiradiatus"}, {"common_names": ["1"], "family": "Aizoaceae", "genus": "Drosanthemum", "image_url": "https://bs.plantnet.org/image/s/26ade55bd1e34688ddb9b7520fcfa944ac747d0a", "match_percentage": 6.94, "name": "Drosanthemum floribundum (Haw.) Schwantes", "pretty_name": "Drosanthemum floribundum"}, {"common_names": ["1"], "family": "Aizoaceae", "genus": "Carpobrotus", "image_url": "https://bs.plantnet.org/image/s/4ab77dca0ce448d7dc9fb40c6198be4f1d6451be", "match_percentage": 4.21, "name": "Carpobrotus acinaciformis (L.) L.Bolus", "pretty_name": "Carpobrotus acinaciformis"}], "status": "success"}})

    response = get_plantnet_results(image_base64)

    if response.status_code == 200:
        api_response = response.json()
        results = parse_plantnet_results(api_response)

        # Return the results as JSON
        return jsonify({
            "status": "success",
            "results": results
        })

    else:
        print(f"Error {response.status_code}: {response.text}")
        # Return dummy response for now
        return jsonify({"status": "error"})


def get_plantnet_results(image_base64: str):
    url = f"https://my-api.plantnet.org/v2/identify/all?api-key={PLANTNET_API_KEY}"

    # Remove base64 metadata if present
    if "base64," in image_base64:
        image_base64 = image_base64.split("base64,")[1]

    # Decode base64
    image_data = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_data))

    # Convert to JPEG (smaller)
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    buffer = io.BytesIO()
    image.save(buffer, format="JPEG", quality=80)  # adjust quality if needed
    buffer.seek(0)

    # Send to another API as multipart/form-data
    files = {
        'images': ('image.jpeg', buffer, 'image/jpeg')
    }

    # Decode base64 to bytes
    image_bytes = base64.b64decode(image_base64)

    # Create a file-like object from bytes
    image_file = io.BytesIO(image_bytes)
    image_file.name = 'image.jpeg'  # give it a filename

    params = {
        'include-related-images': 'true',
        'no-reject': 'false',
        'nb-results': '5',
        'lang': 'he',
    }

    data = {
        'organs': 'leaf',
    }

    return requests.post(url, params=params, files=files, data=data)


def parse_plantnet_results(api_response: dict):
    simplified_results = []

    results = api_response.get("results", [])
    for result in results:
        try:
            species = result.get("species", {})
            score = result.get("score", 0)

            simplified_results.append({
                "pretty_name": species.get("scientificNameWithoutAuthor", ""),
                "name": species.get("scientificName", ""),
                "match_percentage": round(score * 100, 2),
                "common_names": species.get("commonNames", []),
                "family": species.get("family", {}).get("scientificName", ""),
                "genus": species.get("genus", {}).get("scientificName", ""),
                "image_url": result.get("images", [{}])[0].get("url", {}).get("s", "")
            })

        except Exception as e:
            # Skip bad entries but log if needed
            print(f"Error parsing result: {e}")
            continue

    return simplified_results

if __name__ == "__main__":
    app.run(port=5000, debug=True)
    print("Server is running on port 5000")
