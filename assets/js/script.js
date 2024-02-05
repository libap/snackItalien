'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

const links = document.querySelectorAll(".navbar-link");

// Ajoutez un gestionnaire d'événement pour chaque lien du menu
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        if (window.innerWidth <= 768) {
            toggleNavbar(); // Fermez le nav après avoir cliqué sur un élément du menu
        }
    });
}

addEventOnElements(navTogglers, "click", toggleNavbar);


/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
}

const chevronIcon = document.querySelector(".parent-chevron-up");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
        //console.log(window.scrollY)
        header.classList.add("active");
        hideHeader();
        if (window.scrollY >= 1300) {
            chevronIcon.style.display = "flex";

        }
    } else {
        header.classList.remove("active");
        chevronIcon.style.display = "none";

    }
});






/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(function () {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});


const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const jourActuel = new Date().getDay();



console.log(`Aujourd'hui, c'est ${joursSemaine[jourActuel]}`);
const entreesPlats = document.querySelector('#entreesPlats');
const desserts = document.querySelector('#desserts');
const ImageentreesPlats = document.querySelector('#imagePlats');
const Imagedesserts = document.querySelector('#imageDesserts');



if (jourActuel !== 0 && jourActuel !== 6) {
    entreesPlats.href = `#entreesPlats${joursSemaine[jourActuel]}`;
    desserts.href = `#desserts${joursSemaine[jourActuel]}`;
    ImageentreesPlats.href = `#entreesPlats${joursSemaine[jourActuel]}`;
    Imagedesserts.href = `#desserts${joursSemaine[jourActuel]}`;
} else {
    entreesPlats.href = `#entreesPlatsLundi`;
    desserts.href = `#dessertsLundi`;
    ImageentreesPlats.href = `#entreesPlatsLundi`;
    Imagedesserts.href = `#dessertsLundi`;
}