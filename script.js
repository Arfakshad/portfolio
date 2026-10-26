// ===============================
// Remove "no-js" class as soon as JS runs
// ===============================
document.documentElement.classList.remove("no-js");


// ===============================
// ACTIVE NAVIGATION + HEADER SHADOW
// Combined scroll handler with rAF throttle
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let ticking = false;

function onScroll() {

    if (!ticking) {

        window.requestAnimationFrame(() => {

            const scrollY = window.scrollY;

            // Active nav link
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });

            // Header shadow
            if (header) {
                if (scrollY > 50) {
                    header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";
                    header.style.background = "rgba(7,15,35,.95)";
                } else {
                    header.style.boxShadow = "none";
                    header.style.background = "rgba(7,15,35,.75)";
                }
            }

            ticking = false;

        });

        ticking = true;
    }

}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();


// ===============================
// SCROLL REVEAL
// ===============================

if (!prefersReducedMotion) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });

    }, { threshold: 0.15 });

    const cards = document.querySelectorAll(
        ".card, .skill-box, .project-card, .achievement-card, .certificate-card, .contact-box"
    );

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all .7s ease";
        observer.observe(card);
    });

}


// ===============================
// HERO STATS COUNTER
// Handles decimals (9.5) and suffixes (4+, 350+, 5+)
// ===============================

const counters = document.querySelectorAll(".hero-stats h3");

counters.forEach(counter => {

    const rawText = counter.innerText.trim();

    if (prefersReducedMotion) {
        counter.innerText = rawText;
        return;
    }

    const match = rawText.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");

    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = targetNumber * eased;

        if (isDecimal) {
            counter.innerText = current.toFixed(1) + suffix;
        } else {
            counter.innerText = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            counter.innerText = rawText;
        }

    };

    requestAnimationFrame(animate);

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            const offset = 80;
            const targetTop =
                target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetTop,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });

            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        }

    });

});
