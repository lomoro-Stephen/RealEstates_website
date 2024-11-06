const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close');
const thumbnails = document.querySelectorAll('.lightbox-thumb');

let currentIndex = 0;
const imagesArray = Array.from(galleryItems).map(item => item.src);

// Open the lightbox when an image is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index; 
        openLightbox();
    });
});

// Open the lightbox function
function openLightbox() {
    lightboxImage.src = imagesArray[currentIndex];
    lightbox.classList.add('show'); 
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightboxImage.style.opacity = 1; 
        lightboxImage.style.transform = 'scale(1)';
    }, 10); 

    // Update thumbnail active state
    updateActiveThumbnail();
}

// Close the lightbox function
closeBtn.addEventListener('click', () => {
    lightboxImage.style.opacity = 0; 
    lightboxImage.style.transform = 'scale(0.9)';
    setTimeout(() => {
        lightbox.classList.remove('show');
        lightbox.style.display = 'none';
    }, 300);
});

// Update the active thumbnail's appearance
function updateActiveThumbnail() {
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Change the displayed image when a thumbnail is clicked
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', (event) => {
        event.stopPropagation(); 
        currentIndex = index; 
        lightboxImage.src = imagesArray[currentIndex];
        updateActiveThumbnail(); 
    });
});

// Close lightbox on clicking outside the image
lightbox.addEventListener('click', () => {
    closeBtn.click(); 
});


//blur card effect

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        serviceCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('blur');
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        serviceCards.forEach(otherCard => {
            otherCard.classList.remove('blur');
        });
    });
});

//testimonial carousal
let currentIndx = 0;
const cards = document.querySelectorAll('.testimonial-card');
const totalCards = cards.length;
const visibleCards = 3;
const autoScrollInterval = 3000;
const transitionDuration = 0.5;

function updateCarousel() {
    const offset = -currentIndx * (100 / visibleCards);
    document.querySelector('.testimonials-cards').style.transform = `translateX(${offset}%)`;
}

// Function to handle the transition after reaching the last card
function nextCard() {
    currentIndx++;
    if (currentIndx > totalCards - visibleCards) {
        // Set a timeout to allow the transition to finish before resetting the index
        setTimeout(() => {
            currentIndx = 0;
            updateCarousel();
        }, transitionDuration * 1000);
    } else {
        updateCarousel();
    }
}

function prevCard() {
    currentIndex--;
    if (currentIndx < 0) {
        currentIndx = totalCards - visibleCards; // Go to the last set of cards
    }
    updateCarousel();
}

document.getElementById('next').addEventListener('click', () => {
    nextCard();
});

document.getElementById('prev').addEventListener('click', () => {
    prevCard();
});

// Initialize the carousel
updateCarousel();

// Auto scroll functionality
let autoScroll = setInterval(nextCard, autoScrollInterval);

// Pause auto scroll on hover
document.querySelector('.testimonials-content').addEventListener('mouseover', () => {
    clearInterval(autoScroll);
});

document.querySelector('.testimonials-content').addEventListener('mouseout', () => {
    autoScroll = setInterval(nextCard, autoScrollInterval);
});

//tabs

const tabs = document.querySelectorAll('.tab');
        const contents = document.querySelectorAll('.tabContent');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // // Remove active class from all tabs and contents
        tabs.forEach((t) => {
            t.classList.remove('activeTab')
        });
        contents.forEach((c) => {
            c.classList.remove('active')
        });
        // Add active class to the clicked tab
        tab.classList.add('activeTab');
        // Show the corresponding content
        const activeContent = document.getElementById(tab.dataset.tab);
        // remove the active class from all the 
        activeContent.classList.add('active');
    });
});

const openMenu = document.querySelector(".fa-bars");
const mobileNavBar = document.querySelector(".mobile-nav");
const closeNav = document.querySelector(".fa-xmark");

// Function to open the mobile nav
openMenu.addEventListener('click', () => {
    mobileNavBar.classList.add('active'); 
    document.body.classList.add('no-scroll'); 
});

// Function to close the mobile nav
closeNav.addEventListener('click', () => {
    mobileNavBar.classList.remove('active');
    document.body.classList.remove('no-scroll'); 
});