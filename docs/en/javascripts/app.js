const voiceButton = document.getElementById('voiceButton');
const searchBox = document.getElementById('searchBox');

voiceButton.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchBox.value = transcript;

        // Optionally, send the transcript to the backend for further processing
        fetch('http://localhost:3000/transcribe', {
            method: 'POST',
            body: JSON.stringify({ audio: transcript }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            searchBox.value = data.text;
            // Simulate pressing the Enter key
              const event = new KeyboardEvent('keyup', {
                    key: 'Enter'
                });
                searchBox.dispatchEvent(event);
        });
    };
});
