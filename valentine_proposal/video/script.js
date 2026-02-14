// ===========================
// ROMANTIC & ELEGANT WEBSITE
// Valentine's Proposal
// ===========================

const bgMusic = document.getElementById('bgMusic');
let currentImageIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-container img');
const dots = document.querySelectorAll('.carousel-dots .dot');

// Play music on first interaction
document.addEventListener('click', () => {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play();
    }
});

// ===========================
// SCROLL TO SECTION
// ===========================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const heroButton = document.querySelector('.hero-btn');
        if (heroButton) {
            spawnButtonHearts(heroButton);
            spawnFloatingHeartsBurst();
        }
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function spawnButtonHearts(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const heartCount = 8;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.className = 'button-heart';
        heart.textContent = '❤';
        const offsetX = (Math.random() - 0.5) * 80;
        const offsetY = (Math.random() - 0.5) * 20;
        heart.style.left = centerX + offsetX + 'px';
        heart.style.top = centerY + offsetY + 'px';
        heart.style.fontSize = (12 + Math.random() * 10) + 'px';
        heart.style.opacity = (Math.random() * 0.4 + 0.5).toFixed(2);
        heart.style.animationDelay = (Math.random() * 0.2) + 's';
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

function spawnFloatingHeartsBurst() {
    const heartCount = 24;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.className = 'button-heart';
        heart.textContent = '❤';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = (Math.random() * window.innerHeight) + 'px';
        heart.style.fontSize = (10 + Math.random() * 12) + 'px';
        heart.style.opacity = (Math.random() * 0.4 + 0.4).toFixed(2);
        heart.style.animationDelay = (Math.random() * 0.3) + 's';
        heart.style.animationDuration = (1.4 + Math.random() * 1.2) + 's';
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

// ===========================
// CAROUSEL FUNCTIONS
// ===========================
function showImage(index) {
    carouselImages.forEach((img, i) => {
        if (i === index) {
            img.classList.add('active');
            img.style.opacity = '1';
        } else {
            img.classList.remove('active');
            img.style.opacity = '0';
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    showImage(currentImageIndex);
}

function currentImage(index) {
    currentImageIndex = index;
    showImage(currentImageIndex);
}

// ===========================
// CELEBRATION CONFETTI
// ===========================
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#B76E79', '#D4A5A5', '#E8C1A0', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        confetti.style.boxShadow = '0 0 10px rgba(183, 110, 121, 0.5)';
        
        container.appendChild(confetti);
        animateConfetti(confetti);
    }
}

function animateConfetti(element) {
    let top = -10;
    let left = parseFloat(element.style.left);
    let rotation = 0;
    let speed = Math.random() * 3 + 2;
    
    const interval = setInterval(() => {
        top += speed;
        rotation += Math.random() * 10;
        left += (Math.random() - 0.5) * 2;
        
        element.style.top = top + 'px';
        element.style.left = left + 'px';
        element.style.transform = 'rotate(' + rotation + 'deg)';
        element.style.opacity = Math.max(0, 1 - (top / window.innerHeight));
        
        if (top > window.innerHeight) {
            element.remove();
            clearInterval(interval);
        }
    }, 30);
}

// ===========================
// PROPOSAL BUTTONS
// ===========================
function celebrateYes() {
    createConfetti();
    
    setTimeout(() => {
        showFinalScreen();
    }, 500);
}

function moveButton() {
    const btn = document.querySelector('.btn-no');
    btn.style.position = 'relative';
    btn.style.left = (Math.random() - 0.5) * 200 + 'px';
    btn.style.top = (Math.random() - 0.5) * 100 + 'px';
    
    const proposal = document.querySelector('.proposal-content');
    const message = document.createElement('p');
    message.style.color = '#B76E79';
    message.style.fontSize = '0.9rem';
    message.style.marginTop = '20px';
    message.style.fontStyle = 'italic';
    message.textContent = '😊 Come on, you know the answer!';
    
    const existingMessage = proposal.querySelector('.tease-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    message.className = 'tease-message';
    proposal.appendChild(message);
}

function restartJourney() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('successModal').classList.add('hidden');
}

// ===========================
// BACKGROUND FLOATING HEARTS
// ===========================
function createFloatingHearts() {
    const container = document.querySelector('.hearts-background');
    const heartCount = window.innerWidth > 768 ? 8 : 4;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.opacity = Math.random() * 0.3 + 0.05;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '0';
        const duration = Math.random() * 10 + 10;
        heart.style.animation = 'sway ' + duration + 's ease-in-out infinite';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
    }
}

function startBottomHearts() {
    const spawnInterval = window.innerWidth > 768 ? 450 : 700;

    setInterval(() => {
        const batchCount = window.innerWidth > 768 ? 3 : 2;

        for (let i = 0; i < batchCount; i++) {
            const heart = document.createElement('span');
            heart.className = 'bottom-heart';
            heart.textContent = '❤';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.fontSize = (10 + Math.random() * 12) + 'px';
            heart.style.opacity = (Math.random() * 0.4 + 0.4).toFixed(2);
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.animationDelay = (Math.random() * 0.4) + 's';
            document.body.appendChild(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }, spawnInterval);
}

// ===========================
// INITIALIZE
// ===========================
createFloatingHearts();
startBottomHearts();

// Show first image on load
showImage(0);

// Auto-advance carousel
setInterval(() => {
    nextImage();
}, 8000);

// Smooth scroll behavior
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add sway animation
if (!document.getElementById('animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = '@keyframes sway { 0%, 100% { transform: rotate(0deg) translateY(0); } 25% { transform: rotate(3deg) translateY(-10px); } 75% { transform: rotate(-3deg) translateY(10px); } }';
    document.head.appendChild(style);
}

// ===========================
// ENVELOPE CARDS HANDLER
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const envelopeCards = document.querySelectorAll('.envelope-card');
    const messagePanel = document.querySelector('.message-panel');
    const backBtn = document.querySelector('.back-btn');
    
    envelopeCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const image = card.dataset.image;
            const text = card.dataset.text;
            
            // Update message panel content
            document.querySelector('.message-image img').src = image;
            document.querySelector('.message-content h2').textContent = title;
            document.querySelector('.message-content p').textContent = text;
            
            // Show message panel
            messagePanel.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    backBtn.addEventListener('click', () => {
        messagePanel.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close message panel when clicking outside
    messagePanel.addEventListener('click', (e) => {
        if (e.target === messagePanel) {
            messagePanel.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// ===========================
// FINAL SCREEN HANDLER
// ===========================
function showFinalScreen() {
    const finalScreen = document.querySelector('.final-screen');
    if (finalScreen) {
        finalScreen.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function restartJourney() {
    const finalScreen = document.querySelector('.final-screen');
    const successModal = document.getElementById('successModal');
    
    if (finalScreen && finalScreen.classList.contains('active')) {
        finalScreen.classList.remove('active');
    }
    if (successModal) {
        successModal.classList.add('hidden');
    }
    
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update the love button handler
document.addEventListener('DOMContentLoaded', () => {
    const loveBtn = document.querySelector('.love-btn');
    if (loveBtn) {
        loveBtn.addEventListener('click', () => {
            const messagePanel = document.querySelector('.message-panel');
            messagePanel.classList.remove('active');
            document.body.style.overflow = 'auto';
            scrollToSection('proposal');
        });
    }
});
