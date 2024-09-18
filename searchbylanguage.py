from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
import whisper
from googletrans import Translator

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

model = whisper.load_model("base", device="cpu")
translator = Translator()

@app.route('/')
def index():
    return "Welcome to the Transcription Service!"

@app.route('/transcribe', methods=['POST'])
def transcribe_and_translate():
    translator = Translator()
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    audio_extension = 'wav' if audio_file.content_type == 'audio/wav' else 'mp3'
    audio_path = os.path.join('docs/uploads', f"audio.{audio_extension}")
    os.makedirs('docs/uploads', exist_ok=True)
    audio_file.save(audio_path)

    if audio_extension == 'mp3':
        wav_path = os.path.join('docs/uploads', 'audio.wav')
        convert_to_wav(audio_path, wav_path)
        audio_path = wav_path

    input_language = request.form.get('language_select', 'en')
    if input_language == "en":
        output_language = "en"
    else:
        output_language = "hi"

    print(" input lang ", input_language)
    print(" output lang ", output_language)

    transcription = model.transcribe(audio_path, language=input_language, fp16=False)['text']



    # Translate to Hindi
    translation = translator.translate(transcription, dest=output_language)
    print(f"Translation to Hindi: {translation}")

    return jsonify({'translatedText': translation.text})

@app.after_request
def apply_cors(response):
    # response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Referrer-Policy"] = "same-origin"
    return response

def convert_to_wav(input_path, output_path):
    subprocess.run(['ffmpeg', '-i', input_path, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', output_path], check=True)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
