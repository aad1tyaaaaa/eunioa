document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="ri-moon-line"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="ri-sun-line"></i>';
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize ECharts for mood and emotion charts
    const moodChart = echarts.init(document.getElementById('moodChart'));
    const emotionChart = echarts.init(document.getElementById('emotionChart'));

    // Mood Chart Options
    const moodChartOption = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}%'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                lineStyle: {
                    color: getComputedStyle(document.body).getPropertyValue('--text-light')
                }
            },
            axisLabel: {
                color: getComputedStyle(document.body).getPropertyValue('--text-light')
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            axisLine: {
                show: false
            },
            axisLabel: {
                color: getComputedStyle(document.body).getPropertyValue('--text-light'),
                formatter: '{value}%'
            },
            splitLine: {
                lineStyle: {
                    color: getComputedStyle(document.body).getPropertyValue('--bg-color'),
                    opacity: 0.5
                }
            }
        },
        series: [{
            name: 'Mood Score',
            data: [65, 70, 80, 75, 85, 90, 78],
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                width: 3,
                color: getComputedStyle(document.body).getPropertyValue('--primary-color')
            },
            itemStyle: {
                color: getComputedStyle(document.body).getPropertyValue('--primary-color'),
                borderColor: '#fff',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(108, 99, 255, 0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(108, 99, 255, 0.1)'
                    }
                ])
            }
        }],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        }
    };

    // Emotion Chart Options
    const emotionChartOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: {
                color: getComputedStyle(document.body).getPropertyValue('--text-light')
            }
        },
        series: [
            {
                name: 'Emotional Balance',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: getComputedStyle(document.body).getPropertyValue('--bg-light'),
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        color: getComputedStyle(document.body).getPropertyValue('--text-color')
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 35, name: 'Happy', itemStyle: { color: '#68D391' } },
                    { value: 25, name: 'Calm', itemStyle: { color: '#63B3ED' } },
                    { value: 20, name: 'Anxious', itemStyle: { color: '#F6AD55' } },
                    { value: 15, name: 'Sad', itemStyle: { color: '#4FD1C5' } },
                    { value: 5, name: 'Angry', itemStyle: { color: '#FC8181' } }
                ]
            }
        ]
    };

    // Set chart options
    moodChart.setOption(moodChartOption);
    emotionChart.setOption(emotionChartOption);

    // Handle window resize for charts
    window.addEventListener('resize', function() {
        moodChart.resize();
        emotionChart.resize();
    });

    // Mood cube interaction
    const moodCube = document.querySelector('.mood-cube');
    const moodButtons = document.querySelectorAll('.mood-btn');
    
    moodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            moodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change mood cube appearance based on selected mood
            const mood = this.classList.contains('happy') ? 'Happy' :
                         this.classList.contains('sad') ? 'Sad' :
                         this.classList.contains('angry') ? 'Angry' : 'Calm';
            
            const colors = {
                happy: '#68D391',
                sad: '#63B3ED',
                angry: '#FC8181',
                calm: '#4FD1C5'
            };
            
            const color = colors[this.classList[1]];
            
            moodCube.textContent = mood;
            moodCube.style.background = `linear-gradient(135deg, ${color}, ${lightenColor(color, 20)})`;
            
            // Animate the cube
            moodCube.style.transform = 'rotateY(180deg) scale(0.9)';
            setTimeout(() => {
                moodCube.style.transform = 'rotateY(0deg) scale(1)';
            }, 300);
            
            // Update mood chart with new data point
            const days = moodChartOption.xAxis.data;
            const lastValue = moodChartOption.series[0].data[moodChartOption.series[0].data.length - 1];
            let newValue;
            
            if (mood === 'Happy') newValue = Math.min(100, lastValue + 15);
            else if (mood === 'Calm') newValue = Math.min(100, lastValue + 5);
            else if (mood === 'Sad') newValue = Math.max(0, lastValue - 10);
            else newValue = Math.max(0, lastValue - 15);
            
            // Shift data and add new value
            moodChartOption.series[0].data.shift();
            moodChartOption.series[0].data.push(newValue);
            
            // Update chart
            moodChart.setOption(moodChartOption);
        });
    });

    // Breathing exercise animation
    const breathingSphere = document.querySelector('.breathing-sphere');
    const startSessionBtn = document.querySelector('.start-session-btn');
    let breathingInterval;
    let isBreathing = false;
    
    startSessionBtn.addEventListener('click', function() {
        if (isBreathing) {
            // Stop breathing
            clearInterval(breathingInterval);
            breathingSphere.textContent = 'Breathe';
            startSessionBtn.innerHTML = '<i class="ri-play-fill"></i> Start Session';
            isBreathing = false;
        } else {
            // Start breathing
            breathingSphere.textContent = 'Breathe In';
            startSessionBtn.innerHTML = '<i class="ri-pause-fill"></i> Pause Session';
            isBreathing = true;
            
            let step = 0;
            const steps = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
            const durations = [4000, 2000, 4000, 2000]; // 4-2-4-2 pattern
            
            breathingInterval = setInterval(() => {
                step = (step + 1) % steps.length;
                breathingSphere.textContent = steps[step];
                
                // Add pulse animation for breathe in/out
                if (steps[step] === 'Breathe In' || steps[step] === 'Breathe Out') {
                    breathingSphere.style.animation = 'none';
                    void breathingSphere.offsetWidth; // Trigger reflow
                    breathingSphere.style.animation = `pulse ${durations[step]/1000}s ease-in-out`;
                }
            }, durations[step]);
        }
    });

    // Chat demo interaction
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    // Predefined bot responses
    const botResponses = [
        "I understand how that can feel overwhelming. Let's break it down - what's one small thing you can do right now to help the situation?",
        "It sounds like you're carrying a lot right now. Remember to be kind to yourself during stressful times.",
        "Would you like to try a quick mindfulness exercise to help ground yourself in this moment?",
        "I hear you. Sometimes just naming what we're feeling can help reduce its intensity. You're doing great by reaching out.",
        "Let's explore this together. Can you tell me more about what specifically is causing you to feel this way?"
    ];
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing';
            typingIndicator.innerHTML = `
                <div class="message-avatar">
                    <i class="ri-robot-line"></i>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Bot response after delay
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                addMessage(randomResponse, 'bot');
            }, 1500 + Math.random() * 2000);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="ri-robot-line"></i>
                </div>
                <div class="message-content">
                    <p>${text}</p>
                    <div class="audio-wave">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
                <div class="message-avatar">
                    <i class="ri-user-line"></i>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate message appearance
        gsap.from(messageDiv, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    // Send message on button click or Enter key
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Animate feature cards with stagger
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Animate tool cards
    gsap.from('.tool-card', {
        scrollTrigger: {
            trigger: '.wellness-tools',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out"
    });
    
    // Animate testimonials
    gsap.from('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    // Animate pricing cards with special effect for featured card
    gsap.from('.pricing-card:not(.featured)', {
        scrollTrigger: {
            trigger: '.pricing',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
    
    gsap.from('.pricing-card.featured', {
        scrollTrigger: {
            trigger: '.pricing',
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 70,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });

    // Helper function to lighten colors
    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1)}`;
    }
});