document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const loginForm = document.getElementById('login-form');
    const notificationArea = document.getElementById('notification-area');
    const loginButton = document.querySelector('.login-button');

    // --- Galaxy Particles Background Effect ---
    particlesJS('galaxy-particles', {
        "particles": {
            "number": {
                "value": 300, // Abundant stars
                "density": {
                    "enable": true,
                    "value_area": 1200 // Spread over a larger area
                }
            },
            "color": {
                // Varying star colors for a cosmic feel
                "value": ["#ffffff", "#b0c4de", "#ffc0cb", "#add8e6"] // White, light blue, pink, light cyan
            },
            "shape": {
                "type": "circle", // Simple circle stars
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.7, // Base opacity
                "random": true, // Random opacity for 'twinkling'
                "anim": {
                    "enable": true, // Enable opacity animation for subtle twinkle
                    "speed": 1, // Slow twinkle speed
                    "opacity_min": 0.1, // Stars fade low
                    "sync": false
                }
            },
            "size": {
                "value": 1.8, // Average star size
                "random": true, // Randomize size for varied stars
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false, // No lines between stars
            },
            "move": {
                "enable": true,
                "speed": 0.3, // Very slow, gentle drift
                "direction": "random", // Stars drift randomly
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false, // No interaction on hover
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false, // No interaction on click
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    // --- End Galaxy Particles Background Effect ---


    // Password Toggle (from previous version)
    if (passwordToggle && passwordField) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            passwordToggle.textContent = type === 'password' ? 'Reveal' : 'Hide'; // Themed text
        });
    }

    // Form Submission (from previous version)
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const originalButtonText = loginButton.textContent;
            loginButton.textContent = 'ENGAGING...'; // Themed loading text
            loginButton.disabled = true;
            loginButton.style.cursor = 'not-allowed';

            setTimeout(() => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                if (username === 'voyager' && password === 'stardust') { // Example credentials
                    showNotification('ACCESS GRANTED. Charting course...', 'success');
                    console.log('Login Successful!');
                } else {
                    showNotification('ACCESS DENIED. Invalid Stellar Credentials.', 'error');
                    const loginContainer = document.querySelector('.login-container');
                    loginContainer.classList.add('shake');
                    loginContainer.addEventListener('animationend', () => {
                        loginContainer.classList.remove('shake');
                    }, { once: true });
                }

                loginButton.textContent = originalButtonText;
                loginButton.disabled = false;
                loginButton.style.cursor = 'pointer';

            }, 1800);
        });
    }

    // Function to show notifications (from previous version)
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        notificationArea.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('hide');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            }, { once: true });
        }, 3000);
    }
});