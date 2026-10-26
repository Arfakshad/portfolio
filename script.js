// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// HEADER SHADOW
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.35)";
        header.style.background = "rgba(7,15,35,.95)";
    } else {
        header.style.boxShadow = "none";
        header.style.background = "rgba(7,15,35,.75)";
    }

});

// ===============================
// SCROLL REVEAL
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.15
});

const cards = document.querySelectorAll(
    ".card, .skill-box, .project-card, .achievement-card, .certificate-card, .contact-box"
);

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all .7s ease";

    observer.observe(card);

});

// ===============================
// HERO STATS COUNTER (FIXED)
// ===============================
// Fix: now handles decimals (9.5) and suffixes (4+, 350+, 5+)
// correctly instead of truncating to integers.

const counters = document.querySelectorAll(".hero-stats h3");

counters.forEach(counter => {

    const rawText = counter.innerText.trim();

    // Extract the numeric part and the suffix (like "+")
    const match = rawText.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isDecimal = match[1].includes(".");

    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (currentTime) => {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out curve for a nicer finish
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
            counter.innerText = rawText; // ensure exact final value
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
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }

    });

});
