from flask import Flask, request, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'upload'

# For test environment
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


# 清理之前的会话文件
for filename in os.listdir(app.config['UPLOAD_FOLDER']):
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        return filename
    return 'Error', 400

@app.route('/transcribe', methods=['GET'])
def transcribe():
    return "Dummy Transcription"

@app.route('/summarize', methods=['GET'])
def summarize():
    return "Dummy Summary"

@app.route('/upload/<filename>', methods=['GET'])
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)
