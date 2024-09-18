import torch
import pytest
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from datasets import load_dataset

# Test case 1: Test model and processor initialization
def test_model_initialization():
    model_id = "openai/whisper-large-v3"
    
    # Load model
    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch.float32, low_cpu_mem_usage=True, use_safetensors=True
    )
    
    # Load processor
    processor = AutoProcessor.from_pretrained(model_id)
    
    # Check if both are initialized correctly
    assert model is not None, "Model failed to initialize"
    assert processor is not None, "Processor failed to initialize"

# Test case 2: Test pipeline execution on a sample
def test_pipeline_execution():
    model_id = "openai/whisper-large-v3"
    
    # Load model and processor
    model = AutoModelForSpeechSeq2Seq.from_pretrained(
        model_id, torch_dtype=torch.float32, low_cpu_mem_usage=True, use_safetensors=True
    )
    processor = AutoProcessor.from_pretrained(model_id)
    
    # Set up the pipeline
    pipe = pipeline(
        "automatic-speech-recognition",
        model=model,
        tokenizer=processor.tokenizer,
        feature_extractor=processor.feature_extractor,
        torch_dtype=torch.float32,
        device="cpu"  # for testing, we can stick with CPU
    )
    
    # Load a dataset sample
    dataset = load_dataset("distil-whisper/librispeech_long", "clean", split="validation")
    sample = dataset[0]["audio"]

    # Run pipeline on the sample
    result = pipe(sample)
    
    # Verify the result
    assert isinstance(result, dict), "Result should be a dictionary"
    assert "text" in result, "Result should contain a 'text' field"
    assert len(result["text"]) > 0, "The transcribed text should not be empty"

# Test case 3: Test device selection logic
def test_device_selection():
    device = "cuda:0" if torch.cuda.is_available() else "cpu"
    
    # Check if the device is set correctly
    if torch.cuda.is_available():
        assert device == "cuda:0", "CUDA is available but device is not set to GPU"
    else:
        assert device == "cpu", "CUDA is not available but device is not set to CPU"
