document.addEventListener('DOMContentLoaded', function() {
    // Mood Tracker Interaction
    const moodOptions = document.querySelectorAll('.mood-option');
    const moodResult = document.querySelector('.mood-result');
    
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            moodOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Show result section with animation
            moodResult.classList.remove('hidden');
            moodResult.classList.add('scale-in');
            
            // You could store the mood data here or send it to a server
            const moodValue = this.getAttribute('data-mood');
            console.log('Selected mood:', moodValue);
        });
    });
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Breathing Exercise Animation
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingText = document.querySelector('.breathing-text');
    const startButton = document.querySelector('.breathing-exercise .button-85');
    let isBreathing = false;
    let breathInterval;
    
    startButton.addEventListener('click', function() {
        if (!isBreathing) {
            isBreathing = true;
            breathingText.textContent = "Breathe In";
            startButton.querySelector('.text_button').textContent = "Stop Exercise";
            
            let breathPhase = 0;
            breathInterval = setInterval(() => {
                breathPhase = (breathPhase + 1) % 4;
                
                switch(breathPhase) {
                    case 0: // Breathe in
                        breathingText.textContent = "Breathe In";
                        breathingCircle.style.transform = "scale(1.1)";
                        break;
                    case 1: // Hold
                        breathingText.textContent = "Hold";
                        break;
                    case 2: // Breathe out
                        breathingText.textContent = "Breathe Out";
                        breathingCircle.style.transform = "scale(1)";
                        break;
                    case 3: // Hold
                        breathingText.textContent = "Hold";
                        break;
                }
            }, 4000);
        } else {
            isBreathing = false;
            clearInterval(breathInterval);
            breathingText.textContent = "Breathe In";
            startButton.querySelector('.text_button').textContent = "Start Exercise";
            breathingCircle.style.transform = "scale(1)";
        }
    });
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.slide-in, .fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Button hover effects
    const buttons = document.querySelectorAll('.button-85');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.setProperty('--active', '1');
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.setProperty('--active', '0');
        });
    });
});