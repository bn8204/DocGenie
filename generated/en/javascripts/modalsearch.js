document.addEventListener('DOMContentLoaded', function() {
    const voiceButton = document.getElementById('voice-button');
    const modal = document.getElementById('voice-modal');
    const modalText = document.getElementById('transcribed-text');
    const searchBox = document.getElementById('search-box');
    const closeButton = modal.querySelector('.close');


    let mediaRecorder;
    let audioChunks = [];

    voiceButton.addEventListener('click', function() {
        resetModal();
        modal.style.display = 'block';
        startRecording();
    });

    function resetModal() {
        modalText.innerText = 'Listening...';
        audioChunks = [];
        searchBox.value='';
    }

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener('stop', () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    audioChunks = [];
                    transcribeAudio(audioBlob);
                });

                setTimeout(() => {
                    mediaRecorder.stop();
                }, 2000); // Record for 5 seconds
            });
    }

    function transcribeAudio(audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob);

        fetch('http://127.0.0.1:5000/transcribe', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const transcribedText = data.text;
            modalText.innerText = transcribedText;
            setTimeout(function() {
                modal.style.display = 'none';
                searchBox.value = transcribedText;


                setTimeout(() => {
                    simulateEnterKey(searchBox);
                }, 100); // Delay to ensure the DOM is updated
            }, 2000);
        });
    }
// Check for browser support
if ('webkitSpeechRecognition' in window) {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Set the language to English (US)

  recognition.onresult = function(event) {
    var interimTranscript = '';
    var finalTranscript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    document.getElementById('transcribed-text').innerText = finalTranscript + interimTranscript;
  };

  recognition.start();
  const modal = document.getElementById('voice-modal');
const closeButton = modal.querySelector('.close');

 closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        if (recognition) {
            recognition.stop();
        }
    });

// Close the modal when clicking outside of it
 window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    if (recognition) {
      recognition.stop();
    }
  }
}
} else {
  console.log('Speech recognition not supported in this browser.');
}

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
});



