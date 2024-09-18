document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    const titleElement = document.getElementById('title');
    const contentElement = document.getElementById('content');

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = languageSelect.value;
        loadLanguageContent(selectedLanguage);
    });

    function loadLanguageContent(language) {
        fetch(`${language}.json`)
            .then(response => response.json())
            .then(data => {
                titleElement.textContent = data.title;
                contentElement.textContent = data.content;
            })
            .catch(error => {
                console.error('Error loading language content:', error);
            });
    }

    // Load default language content
    loadLanguageContent('en');
});
