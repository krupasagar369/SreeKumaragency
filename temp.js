// Temporary file to verify the content
// Partner cards functionality
function setupPartnerCards() {
    const partnerImages = document.getElementById('partnerImages');
    const partnerImageGrid = document.getElementById('partnerImageGrid');
    const partnerCards = document.querySelectorAll('.partner-card');
    const closePartnerBtn = document.getElementById('closePartnerImages');

    function displayPartnerImages(partner) {
        const data = partnerImageData[partner];
        if (!data) return;

        // Clear existing content and show loading state
        partnerImageGrid.innerHTML = '';
        partnerImageGrid.classList.add('loading');

        // Create and append all image cards
        const row = document.createElement('div');
        row.className = 'row g-4';

        data.images.forEach((image, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="partner-image-card" style="animation-delay: ${index * 0.1}s">
                    <img src="${image.src}" alt="${image.alt}" class="img-fluid rounded">
                    <div class="partner-product-content">
                        <h5>${image.alt}</h5>
                        <p class="product-description">${image.description}</p>
                        <a href="#contact" class="btn btn-primary btn-sm btn-custom">
                            More Details - Contact Us <i class="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            `;
            row.appendChild(col);
        });

        // Add the content to the grid
        partnerImageGrid.appendChild(row);

        // Remove loading state and show the section
        setTimeout(() => {
            partnerImageGrid.classList.remove('loading');
            partnerImages.classList.add('active');
            
            // Add click handlers for contact buttons
            document.querySelectorAll('.partner-product-content .btn-custom').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const contactSection = document.querySelector('#contact');
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    const contactForm = document.querySelector('.contact-form-card');
                    contactForm.classList.add('highlight');
                    setTimeout(() => contactForm.classList.remove('highlight'), 2000);
                });
            });

            // Smooth scroll to the images
            partnerImages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    // Handle partner card clicks
    partnerCards.forEach(card => {
        card.addEventListener('click', () => {
            const partner = card.getAttribute('data-partner');
            
            if (card.classList.contains('active')) {
                // Close the current view
                card.classList.remove('active');
                partnerImages.classList.remove('active');
                partnerImageGrid.innerHTML = '';
            } else {
                // Deactivate all cards first
                partnerCards.forEach(c => c.classList.remove('active'));
                
                // Activate clicked card and show images
                card.classList.add('active');
                displayPartnerImages(partner);
            }
        });
    });

    // Handle close button click
    closePartnerBtn?.addEventListener('click', () => {
        partnerImages.classList.remove('active');
        partnerCards.forEach(c => c.classList.remove('active'));
        partnerImageGrid.innerHTML = '';
    });
}

// Initialize partner cards functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', setupPartnerCards);