document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    const chatModal = document.createElement('div');
    chatModal.id = 'chat-modal';
    chatModal.className = 'chat-modal';
    chatModal.innerHTML = `
        <div class="chat-modal-content">
            <div class="chat-header">
                <h3>Chat with Eunoia</h3>
                <span class="close-modal">&times;</span>
            </div>
            <div id="chat-box" class="chat-box"></div>
            <form id="chat-form" class="chat-form">
                <input type="text" id="user-input" placeholder="Type your message...">
                <button type="submit">Send</button>
            </form>
        </div>
    `;
    document.body.appendChild(chatModal);

    // Show modal when button is clicked
    chatButton.addEventListener('click', function() {
        chatModal.style.display = 'block';
        // Initialize chat with welcome message
        setTimeout(() => {
            simulateTyping("Hi there! I'm Eunoia, your mental health support companion. How can I help you today?", 'bot-message');
        }, 1000);
    });

    // Close modal when X is clicked
    chatModal.querySelector('.close-modal').addEventListener('click', function() {
        chatModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === chatModal) {
            chatModal.style.display = 'none';
        }
    });

    // Chat form submission
    document.getElementById('chat-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const userInput = document.getElementById('user-input');
        const message = userInput.value.trim();
        const chatBox = document.getElementById('chat-box');
        
        if (message) {
            // Add user message to chat
            addMessage(message, 'user-message');
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Send message to server
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });
                
                const data = await response.json();
                // Remove typing indicator
                removeTypingIndicator();
                // Add bot response with typing simulation
                simulateTyping(data.response, 'bot-message');
            } catch (error) {
                removeTypingIndicator();
                addMessage('Sorry, I encountered an error. Please try again.', 'bot-message');
            }
        }
    });

    function addMessage(text, className) {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        smoothScrollToBottom();
    }

    function showTypingIndicator() {
        const chatBox = document.getElementById('chat-box');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        chatBox.appendChild(typingDiv);
        smoothScrollToBottom();
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function simulateTyping(text, className) {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        chatBox.appendChild(messageDiv);
        
        let i = 0;
        const typingSpeed = 20; // milliseconds per character
        
        function typeWriter() {
            if (i < text.length) {
                messageDiv.textContent += text.charAt(i);
                i++;
                smoothScrollToBottom();
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        typeWriter();
    }

    function smoothScrollToBottom() {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }
});
