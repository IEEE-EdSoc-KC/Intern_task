// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
    
    setInterval(createParticle, 300);
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 3000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Glitch Effect
function addGlitchEffect() {
    const titles = document.querySelectorAll('.section-title, .hero-title');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'none';
            title.offsetHeight; // Trigger reflow
            title.style.animation = 'glitch 0.3s ease-in-out';
        });
    });
}

// Game Over Effect
function triggerGameOver() {
    const gameOver = document.createElement('div');
    gameOver.className = 'game-over';
    gameOver.textContent = 'LEVEL COMPLETE!';
    document.body.appendChild(gameOver);
    
    setTimeout(() => {
        gameOver.remove();
    }, 3000);
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerGameOver();
        konamiCode = [];
    }
});

// Interactive Project Screens
function initProjectScreens() {
    const projectScreens = document.querySelectorAll('.project-screen');
    
    projectScreens.forEach((screen, index) => {
        // Add animated content to project screens
        const canvas = document.createElement('canvas');
        canvas.width = screen.offsetWidth - 6;
        canvas.height = screen.offsetHeight - 6;
        canvas.style.position = 'absolute';
        canvas.style.top = '3px';
        canvas.style.left = '3px';
        canvas.style.borderRadius = '7px';
        screen.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        function animateScreen() {
            ctx.fillStyle = '#001122';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw animated grid
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time) * 0.2})`;
            ctx.lineWidth = 1;
            
            for (let x = 0; x < canvas.width; x += 20) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw project-specific animations
            switch(index) {
                case 0: // FYUGP GenAI
                    drawAINetwork(ctx, time);
                    break;
                case 1: // FYUGP GenAI V2
                    drawAIBrain(ctx, time);
                    break;
                case 2: // EduSync
                    drawNetworkNodes(ctx, time);
                    break;
            }
            
            time += 0.1;
            requestAnimationFrame(animateScreen);
        }
        
        animateScreen();
    });
}

function drawAINetwork(ctx, time) {
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#ff00ff';
    
    // Draw neural network nodes
    const nodes = [
        {x: 30, y: 40}, {x: 60, y: 30}, {x: 60, y: 50},
        {x: 90, y: 25}, {x: 90, y: 40}, {x: 90, y: 55},
        {x: 120, y: 35}, {x: 120, y: 45}
    ];
    
    // Draw connections with animated pulses
    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            const pulse = Math.sin(time + i + j) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(255, 0, 255, ${pulse})`;
            ctx.stroke();
        }
    }
    
    // Draw nodes
    nodes.forEach((node, i) => {
        const glow = Math.sin(time + i * 0.5) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 0, 255, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawAIBrain(ctx, time) {
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    
    // Draw brain outline
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 40, 30, 0, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw synapses
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 25 + Math.sin(time + i) * 5;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.5 + 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${Math.sin(time + i) * 0.3 + 0.3})`;
        ctx.stroke();
    }
}

function drawNetworkNodes(ctx, time) {
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffff00';
    
    // Draw interconnected nodes representing professional network
    const networkNodes = [];
    for (let i = 0; i < 6; i++) {
        networkNodes.push({
            x: 30 + (i % 3) * 40,
            y: 40 + Math.floor(i / 3) * 30,
            connections: []
        });
    }
    
    // Create connections
    networkNodes.forEach((node, i) => {
        networkNodes.forEach((otherNode, j) => {
            if (i !== j && Math.random() > 0.6) {
                node.connections.push(j);
            }
        });
    });
    
    // Draw connections
    networkNodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
            const targetNode = networkNodes[connectionIndex];
            const pulse = Math.sin(time + i + connectionIndex) * 0.4 + 0.6;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.strokeStyle = `rgba(255, 255, 0, ${pulse})`;
            ctx.stroke();
        });
    });
    
    // Draw nodes
    networkNodes.forEach((node, i) => {
        const size = 3 + Math.sin(time + i) * 1;
        const glow = Math.sin(time + i * 0.7) * 0.3 + 0.7;
        
        ctx.fillStyle = `rgba(255, 255, 0, ${glow})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Sound Effects (Web Audio API)
let audioContext;

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playBeep(frequency = 440, duration = 200) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Add sound effects to buttons
function addSoundEffects() {
    const buttons = document.querySelectorAll('.nav-btn, .arcade-btn, .social-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            playBeep(800, 100);
        });
        
        button.addEventListener('click', () => {
            playBeep(1200, 150);
        });
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Power-up Effect
function createPowerUpEffect(element) {
    const powerUp = document.createElement('div');
    powerUp.style.position = 'absolute';
    powerUp.style.top = '50%';
    powerUp.style.left = '50%';
    powerUp.style.transform = 'translate(-50%, -50%)';
    powerUp.style.width = '100px';
    powerUp.style.height = '100px';
    powerUp.style.border = '3px solid #ffff00';
    powerUp.style.borderRadius = '50%';
    powerUp.style.boxShadow = '0 0 30px #ffff00';
    powerUp.style.pointerEvents = 'none';
    powerUp.style.zIndex = '1000';
    powerUp.style.animation = 'powerUpSpin 1s ease-out forwards';
    
    element.style.position = 'relative';
    element.appendChild(powerUp);
    
    setTimeout(() => {
        powerUp.remove();
    }, 1000);
}

// Typing effect for hero subtitle
function typeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = 'FULL STACK DEVELOPER';
    let i = 0;
    
    subtitle.style.animation = 'none';
    subtitle.textContent = '';
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 150);
        } else {
            subtitle.style.borderRight = '3px solid transparent';
        }
    }
    
    setTimeout(type, 4000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    hideLoadingScreen();
    createParticles();
    initSmoothScrolling();
    addGlitchEffect();
    
    // Initialize audio on first user interaction
    document.addEventListener('click', () => {
        if (!audioContext) {
            initAudio();
            addSoundEffects();
        }
    }, { once: true });
    
    // Initialize project screens after a short delay
    setTimeout(() => {
        initProjectScreens();
    }, 1000);
    
    // Create matrix rain effect
    createMatrixRain();
    
    // Add power-up effects to skills
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        skill.addEventListener('click', () => {
            createPowerUpEffect(skill);
            playBeep(1500, 200);
        });
    });
    
    // Add hover effects to project cabinets
    const projectCabinets = document.querySelectorAll('.project-cabinet');
    projectCabinets.forEach(cabinet => {
        cabinet.addEventListener('mouseenter', () => {
            playBeep(600, 100);
        });
    });
});

// Initialize typing effect
window.addEventListener('load', typeWriter);
