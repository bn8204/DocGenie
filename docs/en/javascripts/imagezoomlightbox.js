document.addEventListener('DOMContentLoaded', (event) => {
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        zoomable: false,
        loop: true,
        autoplayVideos: true,
        onOpen: () => {
            // Event listener for when the popup opens
            document.querySelectorAll('.glightbox-container img').forEach(img => {
                   // Assign a different usemap based on some condition (e.g., image source)
                if (img.src.includes('intervalreadchartview.png')) {
                    img.setAttribute('usemap', '#workmap1');
                } else if (img.src.includes('registerreadschartview.png')) {
                    img.setAttribute('usemap', '#workmap2');
                } else if (img.src.includes('timealignedview.png')) {
                    img.setAttribute('usemap', '#workmap3');
                }
                 else if (img.src.includes('detailedview.png')) {
                    img.setAttribute('usemap', '#workmap4');
                }else {
                    img.setAttribute('usemap', '#workmap'); // Default map
                }
            });
        },
    });
});


if ('annyang' in window) {
    annyang.addCommands({
        'search for *query': function(query) {
            document.querySelector('.md-search__input').value = query;
            document.querySelector('.md-search__form').submit();
        }
    });

    annyang.start();
}