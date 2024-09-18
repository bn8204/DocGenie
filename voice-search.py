import torch
import torchaudio
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"
device = "cuda:0" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32

model_id = "openai/whisper-large-v3"

model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True, use_safetensors=True
)
model.to(device)

processor = AutoProcessor.from_pretrained(model_id)

pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=device,
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    audio_path = os.path.join('uploads', audio_file.filename)
    os.makedirs('uploads', exist_ok=True)
    audio_file.save(audio_path)

    # Load and process the audio file
    audio_input, sample_rate = torchaudio.load(audio_path)
    audio_input = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)(audio_input)

    # Transcribe the audio
    result = pipe(audio_input.squeeze(0))
    transcribed_text = result["text"]

    return jsonify({'transcribedText': transcribed_text})

@app.after_request
def apply_cors(response):
    # response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Referrer-Policy"] = "same-origin"
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)
