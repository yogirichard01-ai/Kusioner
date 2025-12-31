// ============================================
// Gold Particle Background Animation
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                twinkle: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.twinkle += 0.02;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            const opacity = particle.opacity + Math.sin(particle.twinkle) * 0.2;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// Countdown Timer
// ============================================
class CountdownTimer {
    constructor() {
        this.targetDate = new Date('2026-01-01T00:00:00').getTime();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            this.elements.days.textContent = '00';
            this.elements.hours.textContent = '00';
            this.elements.minutes.textContent = '00';
            this.elements.seconds.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.elements.days.textContent = String(days).padStart(2, '0');
        this.elements.hours.textContent = String(hours).padStart(2, '0');
        this.elements.minutes.textContent = String(minutes).padStart(2, '0');
        this.elements.seconds.textContent = String(seconds).padStart(2, '0');
    }
}

// ============================================
// Fireworks Animation
// ============================================
class Fireworks {
    constructor() {
        this.canvas = document.getElementById('fireworks-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fireworks = [];
        this.particles = [];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 215, b: 0 };
    }

    createFirework(x, y, isElegant = false) {
        const colors = ['#ffd700', '#d4af37', '#ffed4e', '#ffa500', '#ffff00'];
        const elegantColors = ['#ffd700', '#d4af37', '#ffed4e', '#fff8dc', '#f5deb3'];
        
        if (isElegant) {
            // Animasi elegan: lebih sedikit partikel, lebih besar, lebih halus
            const particleCount = 30;
            const baseRadius = 2.5;
            
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const speed = Math.random() * 3 + 1.5; // Lebih lambat
                const color = elegantColors[Math.floor(Math.random() * elegantColors.length)];
                
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: color,
                    radius: Math.random() * 2 + baseRadius, // Lebih besar
                    life: 1.0,
                    decay: Math.random() * 0.015 + 0.008, // Fade lebih lambat
                    gravity: 0.05, // Gravitasi lebih kecil
                    twinkle: Math.random() * Math.PI * 2
                });
            }
        } else {
            // Animasi normal untuk klik tombol
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                const speed = Math.random() * 5 + 2;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: color,
                    radius: Math.random() * 3 + 1,
                    life: 1.0,
                    decay: Math.random() * 0.02 + 0.01,
                    gravity: 0.1,
                    twinkle: 0
                });
            }
        }
    }

    explode(fireworkCount = 5, heightFactor = 0.6, isElegant = false) {
        // Create multiple fireworks at random positions
        for (let i = 0; i < fireworkCount; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * heightFactor; // Upper part of screen
            this.createFirework(x, y, isElegant);
        }
        
        this.animate();
    }

    animate() {
        // Fade effect yang lebih halus untuk ambient
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.life -= particle.decay;
            
            // Twinkle effect untuk partikel elegan
            let alpha = particle.life;
            if (particle.twinkle !== undefined) {
                particle.twinkle += 0.1;
                alpha = particle.life * (0.7 + Math.sin(particle.twinkle) * 0.3);
            }

            // Draw particle dengan efek glow yang lebih halus
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            
            // Efek glow yang lebih halus untuk partikel elegan
            if (particle.twinkle !== undefined) {
                // Gradient untuk efek lebih halus pada partikel elegan
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.radius * 2.5
                );
                const colorRgb = this.hexToRgb(particle.color);
                gradient.addColorStop(0, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 1)`);
                gradient.addColorStop(0.5, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.5)`);
                gradient.addColorStop(1, `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0)`);
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.shadowBlur = particle.radius * 10;
                this.ctx.shadowColor = particle.color;
                this.ctx.fill();
            } else {
                // Partikel normal dengan efek standar
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = particle.color;
                this.ctx.fill();
            }
            this.ctx.restore();

            // Remove dead particles
            if (particle.life <= 0 || particle.y > this.canvas.height) {
                this.particles.splice(i, 1);
            }
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            // Clear canvas when done
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

// ============================================
// EmailJS Configuration
// ============================================
// PILIHAN 1: Menggunakan EmailJS (perlu setup)
// INSTRUKSI SETUP EMAILJS:
// 1. Daftar di https://www.emailjs.com/ (gratis)
// 2. Buat Email Service (Gmail/Outlook/dll)
// 3. Buat Email Template dengan variabel: {{message_content}}, {{sender_name}}, {{sender_email}}
// 4. Ganti nilai di bawah ini dengan Public Key, Service ID, dan Template ID Anda

// PILIHAN 2: Menggunakan Formspree (lebih mudah, tidak perlu setup)
// Kunjungi https://formspree.io/, buat form gratis, dapatkan endpoint URL
// Ganti USE_FORMSPREE menjadi true dan isi FORMSPREE_ENDPOINT

const USE_FORMSPREE = true; // Set true untuk menggunakan Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mregdypk'; // Ganti dengan endpoint Formspree Anda

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Ganti dengan Public Key dari EmailJS
    SERVICE_ID: 'YOUR_SERVICE_ID', // Ganti dengan Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Ganti dengan Template ID
    TO_EMAIL: 'yogirichard01@gmail.com' // Email penerima
};

// ============================================
// Message Form Handler
// ============================================
class MessageForm {
    constructor() {
        this.form = document.getElementById('message-form');
        this.formOverlay = document.getElementById('message-form-overlay');
        this.closeFormBtn = document.getElementById('close-form-overlay');
        this.submitBtn = document.getElementById('submit-message');
        this.submitText = document.getElementById('submit-text');
        this.submitLoading = document.getElementById('submit-loading');
        this.formMessage = document.getElementById('form-message');
        
        this.init();
    }

    init() {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }

        // Form submit handler
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Close overlay handlers
        this.closeFormBtn.addEventListener('click', () => this.hideForm());
        this.formOverlay.addEventListener('click', (e) => {
            if (e.target === this.formOverlay) {
                this.hideForm();
            }
        });
    }

    showForm() {
        this.formOverlay.classList.remove('hidden');
        this.formOverlay.setAttribute('aria-hidden', 'false');
        this.resetForm();
    }

    hideForm() {
        this.formOverlay.classList.add('hidden');
        this.formOverlay.setAttribute('aria-hidden', 'true');
        this.resetForm();
    }

    resetForm() {
        this.form.reset();
        this.hideMessage();
        this.setSubmitEnabled(true);
    }

    showMessage(text, isSuccess = true) {
        this.formMessage.textContent = text;
        this.formMessage.classList.remove('hidden', 'success', 'error');
        this.formMessage.classList.add(isSuccess ? 'success' : 'error');
        
        if (isSuccess) {
            // Auto hide success message after 5 seconds
            setTimeout(() => {
                this.hideMessage();
            }, 5000);
        }
    }

    hideMessage() {
        this.formMessage.classList.add('hidden');
    }

    setSubmitEnabled(enabled) {
        this.submitBtn.disabled = !enabled;
        this.submitText.classList.toggle('hidden', !enabled);
        this.submitLoading.classList.toggle('hidden', enabled);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const messageContent = formData.get('message_content');

        // Validate
        if (!messageContent || messageContent.trim() === '') {
            this.showMessage('Mohon tuliskan pesan harapan Anda', false);
            return;
        }

        this.setSubmitEnabled(false);
        this.hideMessage();

        try {
            // Check which service to use for email
            if (USE_FORMSPREE) {
                // Using Formspree
                if (FORMSPREE_ENDPOINT === 'https://formspree.io/f/YOUR_FORM_ID') {
                    throw new Error('Formspree endpoint belum dikonfigurasi. Silakan setup Formspree terlebih dahulu.');
                }

                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageContent.trim(),
                        _subject: 'Pesan Harapan Tahun Baru 2026',
                        _replyto: EMAILJS_CONFIG.TO_EMAIL
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.error) {
                    throw new Error(result.error);
                }

            } else {
                // Using EmailJS
                if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                    throw new Error('EmailJS belum dikonfigurasi. Silakan setup EmailJS terlebih dahulu atau gunakan Formspree dengan mengubah USE_FORMSPREE menjadi true.');
                }

                // Check if EmailJS library is loaded
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS library tidak ditemukan. Pastikan script EmailJS sudah dimuat.');
                }

                // Send email using EmailJS
                const templateParams = {
                    to_email: EMAILJS_CONFIG.TO_EMAIL,
                    sender_name: 'Pengunjung Website',
                    sender_email: 'anonymous@website.com',
                    message_content: messageContent.trim(),
                    reply_to: EMAILJS_CONFIG.TO_EMAIL
                };

                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );
            }

            // Success
            this.showMessage('✅ Pesan harapan berhasil dikirim! Terima kasih atas doa dan harapan baikmu.', true);
            this.form.reset();
            
            // Close form after 3 seconds on success
            setTimeout(() => {
                this.hideForm();
            }, 3000);

        } catch (error) {
            console.error('Error sending email:', error);
            let errorMessage = '❌ Gagal mengirim pesan. ';
            
            if (error.text) {
                errorMessage += `Error: ${error.text}`;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += 'Silakan coba lagi atau hubungi admin.';
            }
            
            this.showMessage(errorMessage, false);
        } finally {
            this.setSubmitEnabled(true);
        }
    }
}

// ============================================
// Envelope Animation with Gold Particles
// ============================================
function createGoldDust() {
    const container = document.querySelector('.envelope-wrapper');
    const splashScreen = document.getElementById('splash-screen');
    const targetContainer = splashScreen || document.body;
    
    // Dapatkan posisi tengah envelope
    const envelopeContainer = document.querySelector('.envelope-container');
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    if (envelopeContainer) {
        const rect = envelopeContainer.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
    }
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('gold-particle');
        
        // Ukuran partikel acak
        const size = Math.random() * 5 + 2 + 'px';
        particle.style.width = size;
        particle.style.height = size;
        
        // Posisi awal (di tengah amplop)
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.position = 'fixed';
        
        targetContainer.appendChild(particle);

        // Arah sebaran acak
        const destinationX = (Math.random() - 0.5) * 800;
        const destinationY = -Math.random() * 500 - 100;

        const animation = particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            delay: Math.random() * 100
        });

        animation.onfinish = () => particle.remove();
    }
}

function openEnvelope() {
    const container = document.querySelector('.envelope-container');
    const splashScreen = document.getElementById('splash-screen');
    const content = document.querySelector('.content');
    const isOpen = container.classList.toggle('open');

    if (isOpen) {
        // Hide hint text
        const hint = document.querySelector('.click-hint');
        if (hint) {
            hint.style.opacity = '0';
        }
        
        // Panggil efek partikel berkali-kali untuk kesan meriah
        for(let i = 0; i < 2; i++) {
            setTimeout(createGoldDust, i * 1000);
        }
        
        // Hide splash screen after letter appears (0.6 seconds)
        setTimeout(() => {
            if (splashScreen) {
                splashScreen.classList.add('hidden');
            }
            // Show main content with fade in
            if (content) {
                content.style.transition = 'opacity 0.6s ease-in';
                content.style.opacity = '1';
            }
            // Show background video and overlay
            document.body.classList.add('loaded');
        }, 600);
    }
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Splash screen animation
    const splashScreen = document.getElementById('splash-screen');
    const content = document.querySelector('.content');
    const envelope = document.getElementById('envelope-click');
    
    // Hide content initially
    if (content) {
        content.style.opacity = '0';
    }
    
    // Envelope click handler
    if (envelope) {
        envelope.addEventListener('click', openEnvelope);
    }
    
    // Initialize countdown timer
    new CountdownTimer();
    
    // Initialize message form
    const messageForm = new MessageForm();
    
    // Button click handlers
    const btnHarapan = document.getElementById('btn-harapan');
    const btnKirimPesan = document.getElementById('btn-kirim-pesan');
    const overlay = document.getElementById('letters-overlay');
    const closeOverlay = document.getElementById('close-overlay');
    const letterCards = document.querySelectorAll('.letter-card');
    const letterMessage = document.getElementById('letter-message');
    const letterText = document.getElementById('letter-text');
    const closeMessage = document.getElementById('close-message');

    // Audio play/pause button
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        const player = document.createElement('div');
        player.className = 'audio-player';

        const btn = document.createElement('button');
        btn.className = 'audio-toggle-btn';
        btn.type = 'button';
        btn.innerText = '▶';

        const label = document.createElement('span');
        label.className = 'audio-label';
        label.textContent = 'Putar musik';

        player.appendChild(btn);
        player.appendChild(label);
        document.body.appendChild(player);

        let isPlaying = false;

        const updateBtn = () => {
            btn.innerText = isPlaying ? '⏸' : '▶';
            label.textContent = isPlaying ? 'Hentikan musik' : 'Putar musik';
        };

        btn.addEventListener('click', async () => {
            try {
                if (!isPlaying) {
                    await bgAudio.play();
                    isPlaying = true;
                } else {
                    bgAudio.pause();
                    isPlaying = false;
                }
                updateBtn();
            } catch (e) {
                console.error('Gagal memutar audio:', e);
            }
        });
    }

    const messages = [
        'Terima kasih sudah bertahan sampai di sini. Semoga tahun baru ini membawa jeda yang damai, ruang untuk sembuh, dan keberanian untuk melangkah lagi.',
        'Di setiap detik yang berlalu, ada doa yang menyertaimu: semoga hatimu tetap hangat, langkahmu dipermudah, dan mimpimu disapa oleh kesempatan baik.',
        'Mari mulai lembaran baru dengan hati ringan: maafkan yang lalu, rangkul yang ada, dan percaya bahwa hal-hal indah sedang menunggu di depan.'
    ];

    const showOverlay = () => {
        overlay.classList.remove('hidden');
        overlay.setAttribute('aria-hidden', 'false');
    };

    const hideOverlay = () => {
        overlay.classList.add('hidden');
        overlay.setAttribute('aria-hidden', 'true');
        letterMessage.classList.add('hidden');
    };

    btnHarapan.addEventListener('click', () => {
        // Add button animation
        btnHarapan.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnHarapan.style.transform = 'scale(1)';
        }, 150);

        showOverlay();
    });

    btnKirimPesan.addEventListener('click', () => {
        // Add button animation
        btnKirimPesan.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnKirimPesan.style.transform = 'scale(1)';
        }, 150);

        messageForm.showForm();
    });

    closeOverlay.addEventListener('click', hideOverlay);

    letterCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const text = messages[index] || messages[0];
            letterText.textContent = text;
            letterMessage.classList.remove('hidden');
        });
    });

    closeMessage.addEventListener('click', () => {
        letterMessage.classList.add('hidden');
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            hideOverlay();
        }
    });
});
