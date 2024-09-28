const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Function to show the slide based on the current index
function showSlide(index) {
    // Ensure the index is within bounds
    currentSlide = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index;

    // Move the slider to the current slide
    // document.querySelector('.slider').style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update slide styles for opacity and size
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.style.opacity = 1;         // Full opacity for the center slide
            slide.style.transform = 'scale(1)'; // Scale up the center slide
        } else {
            slide.style.opacity = 0.5;       // Reduced opacity for side slides
            slide.style.transform = 'scale(0.8)'; // Scale down the side slides
        }
    });

    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Auto-play function for the slider (switches every 5 seconds)
function startSlideShow() {
    slideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000); // Switch every 5 seconds
}

// Pause the slider when dot is clicked and show the corresponding slide
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Pause auto-play when user interacts
        showSlide(index); // Show the clicked slide
        currentSlide = index; // Update current slide
        startSlideShow(); // Restart the auto-play after interaction
    });
});

// Initialize slider
showSlide(0); // Show the first slide
startSlideShow(); // Start auto-play

// Optional: Pause auto-play on hover
const sliderContainer = document.querySelector('.slider'); // Assuming .slider is the container
sliderContainer.addEventListener('mouseover', () => clearInterval(slideInterval));
sliderContainer.addEventListener('mouseout', startSlideShow);
