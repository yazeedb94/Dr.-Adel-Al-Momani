document.addEventListener("DOMContentLoaded", () => {
    // State
    let currentLang = localStorage.getItem("theme2_lang") || "ar";
    
    // Elements
    const langToggle = document.getElementById("lang-toggle");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const bookingForm = document.getElementById("booking-form");

    // Initialize
    setLanguage(currentLang);

    // Event Listeners
    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("theme2_lang", currentLang);
        setLanguage(currentLang);
    });

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if(navMenu.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    // Close menu on link click
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        });
    });

    // Handle Form
    if(bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert(currentLang === "ar" ? "تم تسجيل موعدك بنجاح. سنتواصل معك قريباً لتأكيد الوقت." : "Your appointment has been successfully requested. We will contact you shortly.");
            bookingForm.reset();
        });
    }

    // Scroll Header Effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if(window.scrollY > 50) {
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            header.style.padding = "0";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "10px 0";
        }
    });

    // Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // Core Function
    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        
        if(lang === "ar") {
            document.body.classList.add("lang-ar");
            document.body.classList.remove("lang-en");
            langToggle.innerHTML = `<span>English</span> <i class="fa-solid fa-globe"></i>`;
        } else {
            document.body.classList.add("lang-en");
            document.body.classList.remove("lang-ar");
            langToggle.innerHTML = `<span>عربي</span> <i class="fa-solid fa-globe"></i>`;
        }

        // Translate Text
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if(translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Translate Placeholders
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if(translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
    }
});
