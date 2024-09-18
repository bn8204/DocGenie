document.addEventListener('DOMContentLoaded', function() {
    const voiceButton = document.getElementById('voice-button');
    const modal = document.getElementById('voice-modal');
    const modalText = document.getElementById('transcribed-text');
    const searchBox = document.getElementById('search-box');
    const closeButton = modal.querySelector('.close');
    const languageSelect = document.getElementById('language_select');

    let recognition;
    let selectedLanguage = 'en';
    let finalTranscript = '';

    languageSelect.addEventListener('change', function() {
        selectedLanguage = languageSelect.value === 'Hindi' ? 'hi' : 'en';
    });

    function initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-US';

            recognition.onresult = function(event) {
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }

                modalText.innerText = finalTranscript + interimTranscript;
                searchBox.value = finalTranscript + interimTranscript;
            };

            recognition.onend = function() {
                modal.style.display = 'none';
                uploadAudioAndFetchTranslation();
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
            };
        } else {
            console.log('Speech recognition not supported in this browser.');
        }
    }

    function startSpeechRecognition() {
        initializeSpeechRecognition();
        if (recognition) {
            recognition.start();
        }
    }

    voiceButton.addEventListener('click', function() {
        resetModal();
        modal.style.display = 'block';
        startSpeechRecognition();
    });

    function resetModal() {
        modalText.innerText = 'Listening...';
        searchBox.value = '';
    }

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        if (recognition) {
            recognition.stop();
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            if (recognition) {
                recognition.stop();
            }
        }
    };

    function simulateEnterKey(inputElement) {
        const event = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter',
            keyCode: 13
        });
        inputElement.dispatchEvent(event);
    }

    function uploadAudioAndFetchTranslation() {
        // Create a form to upload the audio file
        const formData = new FormData();
        formData.append('audio', new Blob([finalTranscript], { type: 'audio/wav' }));
        formData.append('language_select', selectedLanguage);

        fetch('http://localhost:5000/transcribe', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.translatedText);
            modalText.innerText = data.translatedText;
            searchBox.value = data.translatedText;
        })
        .catch(error => console.error('Error:', error));
    }
});
