document.addEventListener('DOMContentLoaded', function() {
    const voiceButton = document.getElementById('voice-button');
    const modal = document.getElementById('voice-modal');
    const modalText = document.getElementById('transcribed-text');
    const modalImg = document.getElementById('modal-img');
    const searchBox = document.getElementById('search-box');
    const closeButton = modal.querySelector('.close');
    const languageSelect = document.querySelector('.md-select__link');  // Correct class selector

    let mediaRecorder;
    let audioChunks = [];
    let selectedLanguage = 'en';
    let recognition;
    let silenceTimeout;
    let finalTranscript = '';  // Store the final valid speech

    searchBox.value = '';  // Clear the search box

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    audioChunks = [];
                    // Validate before uploading audio
                    if (isValidSpeech(finalTranscript)) {
                        uploadAudioAndFetchTranslation(audioBlob);
                    } else {
                        modalText.innerText = 'No valid speech detected. Please try again.';
                    }
                };

                startSpeechRecognition();
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
                modalText.innerText = 'Error accessing microphone: ' + error.message;
            });
    }

    function startSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';

            recognition.onresult = function(event) {
                clearTimeout(silenceTimeout);  // Reset silence timeout on speech detection
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                modalText.innerText = interimTranscript;
                silenceTimeout = setTimeout(stopRecordingOnSilence, 2000);  // Stop after 2 seconds of silence
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
            };

            recognition.start();
            silenceTimeout = setTimeout(stopRecordingOnSilence, 2000);  // Initial silence timeout
        } else {
            console.log('Speech recognition not supported in this browser.');
        }
    }

    function stopRecordingOnSilence() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();  // Stop recording
        }
        if (recognition) {
            recognition.stop();    // Stop speech recognition
        }
        // Hide mic image and show processing message immediately
        modalImg.style.display = 'none'; // Hide mic image
        modalText.innerText = 'Processing your request...';  // Show processing message
    }

    voiceButton.addEventListener('click', function() {
        resetModal();
        modal.style.display = 'block';
        modalImg.style.display = 'block';
        modalText.innerText = 'Listening, please speak...';
        finalTranscript = '';  // Clear final transcript before recording
        startRecording();
    });

    function resetModal() {
        modalImg.style.display = 'block';
        modalText.innerText = 'Listening..., please speak...';
        searchBox.value = '';
    }

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        if (recognition) {
            recognition.stop();
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            if (recognition) {
                recognition.stop();
            }
        }
    };

    function uploadAudioAndFetchTranslation(audioBlob) {
        const formData = new FormData();
        const selectedLanguage = languageSelect.innerText === 'हिंदी' ? 'hi' : 'en';
        console.log("Selected Language:", selectedLanguage);

        formData.append('language_select', selectedLanguage);
        formData.append('audio', audioBlob, 'audio.wav');

        modalText.innerText = 'Processing your request...';  // Show processing message
        modalImg.style.display = 'none'; // Hide this specific image


        fetch('http://localhost:5000/transcribe', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.translatedText) {
                modal.style.display = 'none';
                searchBox.value = data.translatedText;
                searchBox.focus();

                // Simulate pressing the Enter key
                const enterEvent = new KeyboardEvent('keydown', {
                    bubbles: true,
                    cancelable: true,
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13
                });
                searchBox.dispatchEvent(enterEvent);

                const firstResult = document.querySelector('.search-result-item');
                if (firstResult) {
                    const link = firstResult.querySelector('a');
                    if (link) {
                        window.open(link.href, '_blank');
                    }
                }
            } else {
                modalText.innerText = 'Error: No translated text received';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            modalText.innerText = 'Error: ' + error.message;
        });
    }

    // Function to validate the speech
    function isValidSpeech(transcript) {
        const trimmedTranscript = transcript.trim();
        // Check if transcript has at least 3 characters (you can adjust this)
        return trimmedTranscript.length >= 3;
    }

});
