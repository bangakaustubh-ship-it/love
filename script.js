/* ==========================================================================
   TO THE LOVE OF MY LIFE - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. FLOATING HEARTS CANVAS ANIMATION
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('heartCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const hearts = [];
        const heartCount = 35;

        class Heart {
            constructor() {
                this.reset(true);
            }

            reset(firstTime = false) {
                this.x = Math.random() * width;
                this.y = firstTime ? Math.random() * height : height + 20;
                this.size = Math.random() * 14 + 8;
                this.speed = Math.random() * 1.5 + 0.6;
                this.opacity = Math.random() * 0.6 + 0.2;
                this.swing = Math.random() * 2;
                this.swingSpeed = Math.random() * 0.03 + 0.01;
                this.color = `hsla(${Math.random() * 30 + 340}, 100%, 75%, ${this.opacity})`;
            }

            update() {
                this.y -= this.speed;
                this.swing += this.swingSpeed;
                this.x += Math.sin(this.swing) * 0.8;

                if (this.y < -30) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.beginPath();
                const d = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
                ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        for (let i = 0; i < heartCount; i++) {
            hearts.push(new Heart());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            hearts.forEach((h) => {
                h.update();
                h.draw();
            });
            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    // ----------------------------------------------------------------------
    // 2. TAB NAVIGATION
    // ----------------------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    function switchTab(targetId) {
        tabSections.forEach((section) => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navButtons.forEach((btn) => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target) switchTab(target);
        });
    });

    // Quick Navigation Buttons inside Success Overlay
    document.querySelectorAll('.goToGalleryBtn').forEach((btn) => {
        btn.addEventListener('click', () => switchTab('gallery-section'));
    });

    document.querySelectorAll('.goToNotesBtn').forEach((btn) => {
        btn.addEventListener('click', () => switchTab('notes-section'));
    });

    document.querySelectorAll('.goToFollowBtn').forEach((btn) => {
        btn.addEventListener('click', () => switchTab('follow-section'));
    });

    document.querySelectorAll('.goToMannKiBaatBtn').forEach((btn) => {
        btn.addEventListener('click', () => switchTab('mannkibaat-section'));
    });

    // ----------------------------------------------------------------------
    // 3. BACKGROUND MUSIC CONTROL
    // ----------------------------------------------------------------------
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicLabel = musicToggle ? musicToggle.querySelector('.music-label') : null;

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    if (musicLabel) musicLabel.textContent = 'Music On';
                }).catch(() => {
                    console.log('Audio autoplay prevented');
                });
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                if (musicLabel) musicLabel.textContent = 'Music Off';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. QUESTION 1 LOGIC ("Are you angry with me?")
    // ----------------------------------------------------------------------
    const angryYesBtn = document.getElementById('angryYesBtn');
    const angryNoBtn = document.getElementById('angryNoBtn');
    const q1Response = document.getElementById('q1Response');
    const q1Icon = document.getElementById('q1Icon');
    const q1Title = document.getElementById('q1Title');
    const q1Message = document.getElementById('q1Message');
    const q1ContinueBtn = document.getElementById('q1ContinueBtn');
    const q1Card = document.getElementById('q1-card');
    const q2Card = document.getElementById('q2-card');

    if (angryYesBtn && angryNoBtn && q1Response) {
        angryYesBtn.addEventListener('click', () => {
            q1Icon.textContent = '🥺';
            q1Title.textContent = "I'm So Sorry! 💔";
            q1Message.textContent = "I never ever want to make you upset. Please forgive me, you mean the world to me!";
            q1Response.classList.remove('hidden');
        });

        angryNoBtn.addEventListener('click', () => {
            q1Icon.textContent = '🥰';
            q1Title.textContent = "Yay! Happy Heart! 💕";
            q1Message.textContent = "You just made my entire day! Seeing you happy is my favorite feeling!";
            q1Response.classList.remove('hidden');
        });
    }

    if (q1ContinueBtn && q1Card && q2Card) {
        q1ContinueBtn.addEventListener('click', () => {
            q1Card.classList.add('hidden');
            q2Card.classList.remove('hidden');
            resetEvadeBtn();
        });
    }

    // ----------------------------------------------------------------------
    // 5. QUESTION 2 EVASIVE "NO" BUTTON & "YES" CELEBRATION LOGIC
    // ----------------------------------------------------------------------
    const loveYesBtn = document.getElementById('loveYesBtn');
    const loveNoBtn = document.getElementById('loveNoBtn');
    const evadeBox = document.getElementById('evadeBox');
    const loveSuccess = document.getElementById('loveSuccess');
    const questionsWrapper = document.querySelector('.questions-wrapper');

    function resetEvadeBtn() {
        if (!loveNoBtn) return;
        loveNoBtn.style.position = 'relative';
        loveNoBtn.style.left = '0px';
        loveNoBtn.style.top = '0px';
    }

    function moveNoButton() {
        if (!loveNoBtn || !evadeBox) return;

        const containerRect = evadeBox.getBoundingClientRect();
        const btnRect = loveNoBtn.getBoundingClientRect();

        // Calculate maximum allowable offset inside evadeBox
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;

        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));

        loveNoBtn.style.position = 'absolute';
        loveNoBtn.style.left = `${randomX}px`;
        loveNoBtn.style.top = `${randomY}px`;
    }

    if (loveNoBtn) {
        // Dodge on mouseover, mouseenter, and touchstart
        ['mouseover', 'mouseenter', 'touchstart'].forEach((eventType) => {
            loveNoBtn.addEventListener(eventType, (e) => {
                e.preventDefault();
                moveNoButton();
            });
        });

        // Backup clickhandler in case user manages to click
        loveNoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }

    if (loveYesBtn && loveSuccess) {
        loveYesBtn.addEventListener('click', () => {
            if (questionsWrapper) questionsWrapper.classList.add('hidden');
            if (q2Card) q2Card.classList.add('hidden');
            loveSuccess.classList.remove('hidden');

            // Scroll smoothly to top of hero card
            const heroCard = document.querySelector('.hero-card');
            if (heroCard) {
                heroCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ----------------------------------------------------------------------
    // 6. START OVER / RESET QUESTIONS BUTTON
    // ----------------------------------------------------------------------
    const resetQuestionsBtn = document.getElementById('resetQuestionsBtn');

    if (resetQuestionsBtn) {
        resetQuestionsBtn.addEventListener('click', () => {
            // Hide success screen
            if (loveSuccess) loveSuccess.classList.add('hidden');

            // Show questions wrapper
            if (questionsWrapper) questionsWrapper.classList.remove('hidden');

            // Show Q1, hide Q1 response box
            if (q1Card) q1Card.classList.remove('hidden');
            if (q1Response) q1Response.classList.add('hidden');

            // Hide Q2 and reset evade button
            if (q2Card) q2Card.classList.add('hidden');
            resetEvadeBtn();

            // Scroll smoothly to top of questions
            const questionsSection = document.getElementById('questions-section');
            if (questionsSection) {
                questionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ----------------------------------------------------------------------
    // 7. PHOTO GALLERY FILTER
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoCards = document.querySelectorAll('.photo-card');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            photoCards.forEach((card) => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// --------------------------------------------------------------------------
// 8. LIGHTBOX GLOBAL FUNCTIONS
// --------------------------------------------------------------------------
function openLightbox(imageSrc, title, desc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        if (lightboxTitle) lightboxTitle.textContent = title || '';
        if (lightboxDesc) lightboxDesc.textContent = desc || '';
        lightbox.classList.add('active');
    }
}

function closeLightbox(event) {
    if (event) {
        if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
            const lightbox = document.getElementById('lightbox');
            if (lightbox) lightbox.classList.remove('active');
        }
    } else {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) lightbox.classList.remove('active');
    }
}