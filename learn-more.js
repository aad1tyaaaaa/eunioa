document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                
                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.animated-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove any existing ripple elements
            const existingRipples = button.querySelectorAll('.ripple-effect');
            existingRipples.forEach(ripple => ripple.remove());
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.resource-card, .care-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (x - centerX) / centerX * 5;
            const tiltY = (y - centerY) / centerY * 5;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.transform = `perspective(1000px) rotateX(${-tiltY}deg) rotateY(${tiltX}deg) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // Fix tab content positioning for mobile
    function handleResponsive() {
        const tabContents = document.querySelectorAll('.tab-content');
        if (window.innerWidth <= 768) {
            tabContents.forEach(content => {
                content.style.position = 'static';
                content.style.width = '100%';
                content.style.left = 'auto';
            });
        } else {
            const tab1Content = document.querySelector('#tab1 + label + .tab-content');
            const tab2Content = document.querySelector('#tab2 + label + .tab-content');
            const tab3Content = document.querySelector('#tab3 + label + .tab-content');
            
            if (tab1Content) tab1Content.style.left = '0';
            if (tab2Content) tab2Content.style.left = '-100%';
            if (tab3Content) tab3Content.style.left = '-200%';
            
            tabContents.forEach(content => {
                content.style.position = 'absolute';
                content.style.width = '300%';
            });
        }
    }
    
    // Run on page load and window resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
    
    // Initialize tab content positions
    const checkActiveTab = () => {
        if (window.innerWidth > 768) {
            if (document.getElementById('tab1').checked) {
                document.querySelector('#tab1 ~ .tab-content').style.left = '0';
            } else if (document.getElementById('tab2').checked) {
                document.querySelector('#tab2 ~ .tab-content').style.left = '-100%';
            } else if (document.getElementById('tab3').checked) {
                document.querySelector('#tab3 ~ .tab-content').style.left = '-200%';
            }
        }
    };
    
    // Check on tab click
    document.querySelectorAll('.tab-label').forEach(label => {
        label.addEventListener('click', checkActiveTab);
    });
    
    // Initial check
    checkActiveTab();
});