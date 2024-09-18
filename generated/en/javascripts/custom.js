const express = require('express');
const multer = require('multer');
const whisper = require('whisper');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
    const model = whisper.load_model("base", device="cpu");
    const audio = whisper.load_audio(req.file.path);
    const mel = whisper.log_mel_spectrogram(audio).to(model.device);
    const options = whisper.DecodingOptions(fp16=False);
    const result = whisper.decode(model, mel, options);
    res.json({ text: result.text });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
