document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const NUM_PARTICLES = 100; // Number of particles on screen
    const PARTICLE_COLOR = '#00ffff'; // Aqua blue/cyan color for particles
    const PARTICLE_MIN_SIZE = 1;
    const PARTICLE_MAX_SIZE = 3;
    const PARTICLE_SPEED = 0.5; // Base movement speed

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-initialize particles on resize to ensure they're spread correctly
        initParticles();
    }

    // Particle object constructor
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE) + PARTICLE_MIN_SIZE;
        this.opacity = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8
        this.directionX = (Math.random() - 0.5) * PARTICLE_SPEED; // Random horizontal direction
        this.directionY = (Math.random() - 0.5) * PARTICLE_SPEED; // Random vertical direction
        this.life = 0; // Current life for fading/shimmering
        this.maxLife = 100 + Math.random() * 100; // Total life before reset

        this.update = function() {
            this.x += this.directionX;
            this.y += this.directionY;
            this.life++;

            // Fade out as it ages
            this.opacity = (1 - (this.life / this.maxLife)) * (0.5 + Math.random() * 0.3);

            // Reverse direction if hitting edges
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX *= -1;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY *= -1;
            }

            // Reset particle if it reaches end of life or fades out completely
            if (this.life >= this.maxLife || this.opacity <= 0.05) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE) + PARTICLE_MIN_SIZE;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.directionX = (Math.random() - 0.5) * PARTICLE_SPEED;
                this.directionY = (Math.random() - 0.5) * PARTICLE_SPEED;
                this.life = 0;
                this.maxLife = 100 + Math.random() * 100;
            }
        };

        this.draw = function() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = PARTICLE_COLOR;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = this.size * 2; // Add a glow effect
            ctx.shadowColor = PARTICLE_COLOR;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };
    }

    function initParticles() {
        particles = []; // Clear existing particles
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    // Initial canvas setup and animation start
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas); // Adjust particles on window resize
    animateParticles();

    // --- Basic Form Submission Logic (for demonstration) ---
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // In a real application, you'd send this to a server for authentication.
        if (username === 'user' && password === 'pass') {
            alert('Login successful! Welcome to the portal!');
            // Example: Redirect to a dashboard
            // window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password. Try "user" and "pass".');
        }
    });
});