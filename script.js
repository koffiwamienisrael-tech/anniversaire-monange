// ===== WAIT FOR DOM =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initGalleryInteractions();
    initVideoInteractions();
    initVisitTracker();
    initAnimations();
    initHeartRain();
    initParallaxEffects();
    initTypingEffect();
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.gallery-item, .video-item, .letter-paragraph');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== GALLERY INTERACTIONS =====
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add floating effect
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add click interaction
        item.addEventListener('click', function() {
            createHeartBurst(this);
        });
    });
}

// ===== VIDEO INTERACTIONS =====
function initVideoInteractions() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add custom controls
        video.addEventListener('play', function() {
            this.parentElement.style.boxShadow = '0 20px 50px rgba(255, 107, 157, 0.4)';
        });
        
        video.addEventListener('pause', function() {
            this.parentElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });

        // Add hover effect
        video.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        video.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

// ===== SECRET VISIT TRACKER =====
function initVisitTracker() {
    let visitCount = localStorage.getItem('anniversaryVisitCount') || 0;
    let lastVisit = localStorage.getItem('anniversaryLastVisit');
    let isFirstVisit = !localStorage.getItem('anniversaryFirstVisit');

    // Increment visit count
    visitCount++;
    localStorage.setItem('anniversaryVisitCount', visitCount);
    localStorage.setItem('anniversaryFirstVisit', 'visited');
    localStorage.setItem('anniversaryLastVisit', new Date().toISOString());

    // Store detailed visit information
    const visitData = {
        count: visitCount,
        lastVisit: lastVisit,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    // Save to localStorage for your access
    localStorage.setItem('visitData', JSON.stringify(visitData));
    
    // Show welcome message for Loren
    const visitTracker = document.getElementById('visitTracker');
    setTimeout(() => {
        if (isFirstVisit) {
            visitTracker.innerHTML = `
                <i class="fas fa-heart"></i>
                Première visite! Bienvenue mon Ange!
            `;
        } else {
            visitTracker.innerHTML = `
                <i class="fas fa-heart"></i>
                Tu es revenue! Je t'aime!
            `;
        }
        visitTracker.classList.add('visible');

        // Hide after 5 seconds
        setTimeout(() => {
            visitTracker.classList.remove('visible');
        }, 5000);
    }, 3000);

    // Create secret access method for you
    createSecretAccess();
    
    // Log visit data for console access
    console.log('%c' + ' '.repeat(50), 'background: #ff6b9d; color: #ff6b9d;');
    console.log('%c VISIT TRACKER - ACCÈS SECRET ', 'background: #ff6b9d; color: white; font-size: 16px; font-weight: bold;');
    console.log('%c' + ' '.repeat(50), 'background: #ff6b9d; color: #ff6b9d;');
    console.log('Tapez "showVisits()" dans la console pour voir les statistiques');
    console.log('Tapez "showAllVisits()" pour voir toutes les visites');
    console.log('Tapez "resetVisits()" pour réinitialiser');
    console.log('Ou cliquez 3 fois rapidement sur le logo "Pour Mon Amour"');
    console.log('%c' + ' '.repeat(50), 'background: #ff6b9d; color: #ff6b9d;');
}

function createSecretAccess() {
    // Method 1: Console functions
    window.showVisits = function() {
        const visitData = JSON.parse(localStorage.getItem('visitData') || '{}');
        const visitCount = localStorage.getItem('anniversaryVisitCount') || 0;
        const lastVisit = localStorage.getItem('anniversaryLastVisit');
        
        console.log('%c=== STATISTIQUES DES VISITES ===', 'color: #ff6b9d; font-size: 14px; font-weight: bold;');
        console.log('Nombre total de visites:', visitCount);
        console.log('Dernière visite:', lastVisit ? new Date(lastVisit).toLocaleString() : 'Non définie');
        console.log('Navigateur:', visitData.userAgent || 'Non défini');
        console.log('Référent:', visitData.referrer || 'Accès direct');
        console.log('Date actuelle:', new Date().toLocaleString());
        
        // Create visual notification
        showSecretNotification(`Visites: ${visitCount} | Dernière: ${lastVisit ? new Date(lastVisit).toLocaleTimeString() : 'N/A'}`);
    };
    
    window.showAllVisits = function() {
        const allData = {
            visitCount: localStorage.getItem('anniversaryVisitCount'),
            firstVisit: localStorage.getItem('anniversaryFirstVisit'),
            lastVisit: localStorage.getItem('anniversaryLastVisit'),
            visitData: JSON.parse(localStorage.getItem('visitData') || '{}')
        };
        
        console.log('%c=== DONNÉES COMPLÈTES ===', 'color: #ff6b9d; font-size: 14px; font-weight: bold;');
        console.table(allData);
        showSecretNotification('Données complètes affichées dans la console');
    };
    
    window.resetVisits = function() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser les visites?')) {
            localStorage.removeItem('anniversaryVisitCount');
            localStorage.removeItem('anniversaryFirstVisit');
            localStorage.removeItem('anniversaryLastVisit');
            localStorage.removeItem('visitData');
            showSecretNotification('Visites réinitialisées!');
            console.log('%cVISITES RÉINITIALISÉES', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
        }
    };
    
    // Method 2: Secret click sequence on logo
    let clickCount = 0;
    let clickTimer;
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 1000);
            
            if (clickCount === 3) {
                clickCount = 0;
                showSecretPanel();
            }
        });
    }
}

function showSecretNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.secret-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'secret-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10002;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showSecretPanel() {
    // Remove existing panel
    const existing = document.querySelector('.secret-panel');
    if (existing) existing.remove();
    
    const visitCount = localStorage.getItem('anniversaryVisitCount') || 0;
    const lastVisit = localStorage.getItem('anniversaryLastVisit');
    
    const panel = document.createElement('div');
    panel.className = 'secret-panel';
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Panel Secret - Statistiques</h3>
            <button class="close-panel">&times;</button>
        </div>
        <div class="panel-content">
            <div class="stat-item">
                <i class="fas fa-eye"></i>
                <span class="stat-label">Visites totales:</span>
                <span class="stat-value">${visitCount}</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-clock"></i>
                <span class="stat-label">Dernière visite:</span>
                <span class="stat-value">${lastVisit ? new Date(lastVisit).toLocaleString() : 'N/A'}</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-calendar"></i>
                <span class="stat-label">Aujourd'hui:</span>
                <span class="stat-value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="panel-actions">
                <button onclick="showVisits()" class="btn-panel">Console</button>
                <button onclick="resetVisits()" class="btn-panel btn-danger">Reset</button>
            </div>
        </div>
    `;
    
    panel.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10003;
        min-width: 350px;
        animation: scaleIn 0.3s ease;
    `;
    
    document.body.appendChild(panel);
    
    // Close panel
    panel.querySelector('.close-panel').addEventListener('click', () => panel.remove());
    panel.addEventListener('click', (e) => {
        if (e.target === panel) panel.remove();
    });
    
    // Add styles for panel
    if (!document.querySelector('#secretPanelStyles')) {
        const styles = document.createElement('style');
        styles.id = 'secretPanelStyles';
        styles.textContent = `
            .secret-panel .panel-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .secret-panel .panel-header h3 {
                margin: 0;
                font-size: 16px;
            }
            .secret-panel .close-panel {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            .secret-panel .close-panel:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .secret-panel .panel-content {
                padding: 20px;
            }
            .secret-panel .stat-item {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(255, 107, 157, 0.05);
                border-radius: 8px;
            }
            .secret-panel .stat-item i {
                color: #ff6b9d;
                margin-right: 15px;
                width: 20px;
            }
            .secret-panel .stat-label {
                flex: 1;
                font-weight: 600;
                color: #333;
            }
            .secret-panel .stat-value {
                color: #667eea;
                font-weight: 700;
            }
            .secret-panel .panel-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            .btn-panel {
                flex: 1;
                padding: 10px;
                border: none;
                border-radius: 8px;
                background: #667eea;
                color: white;
                cursor: pointer;
                font-weight: 600;
                transition: background 0.3s ease;
            }
            .btn-panel:hover {
                background: #5a6fd8;
            }
            .btn-panel.btn-danger {
                background: #ff6b9d;
            }
            .btn-panel.btn-danger:hover {
                background: #ff5790;
            }
            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add floating animation to hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setInterval(() => {
            heroContent.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                heroContent.style.transform = 'translateY(0)';
            }, 2000);
        }, 4000);
    }

    // Add pulse animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// ===== HEART RAIN EFFECT =====
function initHeartRain() {
    // Create heart rain on special interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn') || e.target.closest('.gallery-item')) {
            createHeartRain(e.clientX, e.clientY);
        }
    });
}

function createHeartRain(x, y) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.cssText = `
                position: fixed;
                left: ${x + Math.random() * 40 - 20}px;
                top: ${y}px;
                color: #ff6b9d;
                font-size: ${Math.random() * 20 + 10}px;
                pointer-events: none;
                z-index: 9999;
                animation: heartFall 2s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        const angle = (Math.PI * 2 * i) / 8;
        const velocity = 100;
        
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            color: #ff6b9d;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: heartBurst 1s ease-out forwards;
            --tx: ${Math.cos(angle) * velocity}px;
            --ty: ${Math.sin(angle) * velocity}px;
        `;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const particles = document.querySelectorAll('.particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for hero section
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallax for particles
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 2500);
    }
}

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalCSS = `
    @keyframes heartFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ===== SPECIAL EFFECTS FOR ANNIVERSARY =====
function createSpecialEffects() {
    // Create confetti effect on anniversary
    const anniversaryDate = new Date();
    const today = new Date();
    
    // Check if it's the anniversary month (you can set the actual date)
    if (today.getMonth() === anniversaryDate.getMonth() && today.getDate() === anniversaryDate.getDate()) {
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -10px;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 9998;
                animation: confettiFall 3s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
}

// Add confetti animation
const confettiCSS = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;

const confettiStyleSheet = document.createElement('style');
confettiStyleSheet.textContent = confettiCSS;
document.head.appendChild(confettiStyleSheet);

// Initialize special effects
createSpecialEffects();

// ===== LOVE MESSAGES =====
const loveMessages = [
    "Tu es ma lumière dans l'obscurité",
    "Chaque jour avec toi est un cadeau",
    "Ton sourire illumine mon monde",
    "Je t'aime plus que les mots ne peuvent l'exprimer",
    "Tu es mon rêve devenu réalité",
    "Avec toi, tout est possible",
    "Tu es ma force et ma faiblesse",
    "Mon coeur bat pour toi",
    "Tu es l'amour de ma vie",
    "Merci d'exister, mon ange"
];

function showRandomLoveMessage() {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    // Create floating message
    const message = document.createElement('div');
    message.textContent = randomMessage;
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-size: 1.2rem;
        font-family: 'Dancing Script', cursive;
        z-index: 10000;
        animation: messageFloat 4s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 4000);
}

// Add message animation
const messageCSS = `
    @keyframes messageFloat {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -70%) scale(0.9);
        }
    }
`;

const messageStyleSheet = document.createElement('style');
messageStyleSheet.textContent = messageCSS;
document.head.appendChild(messageStyleSheet);

// Show random love messages periodically
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
        showRandomLoveMessage();
    }
}, 15000);

// ===== FIREWORKS FUNCTIONALITY =====
function initFireworks() {
    const fireworksBtn = document.getElementById('fireworksBtn');
    const fireworksDisplay = document.getElementById('fireworksDisplay');
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const fireworksSound = document.getElementById('fireworksSound');
    const anniversaryText = document.getElementById('anniversaryText');
    
    let ctx;
    let fireworks = [];
    let particles = [];
    let animationId;
    
    // Initialize canvas
    function initCanvas() {
        ctx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
    
    // Fireworks button click
    fireworksBtn.addEventListener('click', function() {
        startFireworks();
    });
    
    // Start fireworks display
    function startFireworks() {
        fireworksDisplay.style.display = 'flex';
        anniversaryText.style.opacity = '0';
        anniversaryText.style.animation = 'none';
        
        // Reset animation
        setTimeout(() => {
            anniversaryText.style.animation = 'messageAppear 2s ease 1s forwards';
        }, 100);
        
        // Play sound
        playFireworksSound();
        
        // Start canvas animation
        initCanvas();
        animate();
        
        // Create multiple fireworks
        createFireworksSequence();
        
        // Auto close after 10 seconds
        setTimeout(() => {
            stopFireworks();
        }, 10000);
        
        // Close on click
        fireworksDisplay.addEventListener('click', function(e) {
            if (e.target === fireworksDisplay) {
                stopFireworks();
            }
        }, { once: true });
    }
    
    // Stop fireworks
    function stopFireworks() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        fireworksDisplay.style.display = 'none';
        fireworks = [];
        particles = [];
    }
    
    // Play fireworks sound
    function playFireworksSound() {
        // Create a simple firework sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        function createFireworkSound() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
        
        // Play multiple sounds for effect
        for (let i = 0; i < 5; i++) {
            setTimeout(createFireworkSound, i * 800);
        }
    }
    
    // Create fireworks sequence
    function createFireworksSequence() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 1000);
        }
    }
    
    // Create single firework
    function createFirework() {
        const x = Math.random() * fireworksCanvas.width;
        const y = fireworksCanvas.height;
        const targetY = Math.random() * fireworksCanvas.height * 0.5;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        fireworks.push({
            x: x,
            y: y,
            targetY: targetY,
            speed: 5,
            color: color,
            exploded: false
        });
    }
    
    // Create explosion particles
    function createExplosion(x, y, color) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 4;
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: color,
                alpha: 1,
                decay: 0.015
            });
        }
    }
    
    // Animation loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        
        // Clear canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            const firework = fireworks[i];
            
            if (!firework.exploded) {
                firework.y -= firework.speed;
                
                // Draw firework
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = firework.color;
                ctx.fill();
                
                // Check if reached target height
                if (firework.y <= firework.targetY) {
                    firework.exploded = true;
                    createExplosion(firework.x, firework.y, firework.color);
                    fireworks.splice(i, 1);
                }
            }
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.alpha -= particle.decay;
            
            if (particle.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }
            
            // Draw particle
            ctx.save();
            ctx.globalAlpha = particle.alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (fireworksDisplay.style.display === 'flex') {
            fireworksCanvas.width = window.innerWidth;
            fireworksCanvas.height = window.innerHeight;
        }
    });
}

// ===== MEDIA MODAL FUNCTIONALITY =====
function initMediaModal() {
    const modal = document.getElementById('mediaModal');
    const modalContainer = document.getElementById('modalMediaContainer');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.close-modal');
    
    // Add click events to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            if (img && overlay) {
                openModal(img.src, 'image', overlay.querySelector('h3').textContent, overlay.querySelector('p').textContent);
            }
        });
    });
    
    // Add click events to video items
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function() {
            const video = this.querySelector('video');
            const caption = this.querySelector('.video-caption p');
            if (video && caption) {
                const videoSrc = video.querySelector('source').src;
                openModal(videoSrc, 'video', 'Vidéo romantique', caption.textContent);
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function openModal(src, type, title, description) {
        modalContainer.innerHTML = '';
        modalCaption.innerHTML = '';
        
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            modalContainer.appendChild(img);
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = false;
            video.muted = false;
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            modalContainer.appendChild(video);
        }
        
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop video if playing
        const video = modalContainer.querySelector('video');
        if (video) {
            video.pause();
        }
    }
}

// ===== ENHANCED VISUAL EFFECTS =====
function initEnhancedEffects() {
    // Add sparkle effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkle ${2 + Math.random() * 3}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(sparkle);
        }
    }
    
    // Add floating hearts to footer
    const footer = document.querySelector('.footer');
    if (footer) {
        setInterval(() => {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart';
            heart.style.cssText = `
                position: absolute;
                color: rgba(255, 107, 157, 0.6);
                font-size: ${10 + Math.random() * 20}px;
                bottom: -20px;
                left: ${Math.random() * 100}%;
                animation: floatUp 4s ease-out forwards;
                pointer-events: none;
            `;
            footer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }, 2000);
    }
}

// Add sparkle animation
const sparkleCSS = `
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes floatUp {
        0% { opacity: 0; transform: translateY(0) rotate(0deg); }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-100px) rotate(360deg); }
    }
`;

const sparkleStyleSheet = document.createElement('style');
sparkleStyleSheet.textContent = sparkleCSS;
document.head.appendChild(sparkleStyleSheet);


// Initialize fireworks when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initGalleryInteractions();
    initVideoInteractions();
    initVisitTracker();
    initAnimations();
    initHeartRain();
    initParallaxEffects();
    initTypingEffect();
    initFireworks(); // Add fireworks initialization
    initMediaModal(); // Add media modal initialization
    initEnhancedEffects(); // Add enhanced visual effects
});

// ===== CONSOLE LOVE MESSAGE =====
console.log('%c' + 
    '     ******       ******       ******\n' +
    '   **********   **********   **********\n' +
    ' ************* ************* *************\n' +
    '***************************************\n' +
    '***************************************\n' +
    ' *************************************\n' +
    '   ***********************************\n' +
    '     *******************************\n' +
    '       ***************************\n' +
    '         ***********************\n' +
    '           *******************\n' +
    '             ***************\n' +
    '               ***********\n' +
    '                 *******\n' +
    '                   ***\n' +
    '                    *\n' +
    '\n' +
    'Joyeux Anniversaire Mon Ange Loren!\n' +
    'Je t\'aime plus que tout au monde!\n' +
    'Tu es mon bonheur éternel!\n' +
    'Prête à devenir Mme Koffi? Je t\'aime!\n', 
    'color: #ff6b9d; font-size: 12px; font-weight: bold;');
