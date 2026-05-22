/* ============================================================
   SEVENKEY — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Latest Singles data (cover art + Spotify links) ---- */
  var SINGLES = [
    { name: "Carry Me Away",  img: "ab67616d0000b273330a36d13d2ef2961f73ced8", id: "28bIdDaJFC3UEDqYVt6LXa" },
    { name: "Sol e Luna",     img: "ab67616d0000b2736a60114c2e6624f8f7e49a1f", id: "2RejxN2cvuYxCBrNxVVmaB" },
    { name: "Love To Hate Me",img: "ab67616d0000b273d2c037a27b2df9591956d495", id: "0Ls3CMt86Ck8BAtUdmLB3p" },
    { name: "Don't Let Me Go",img: "ab67616d0000b273a63cf63d23c692f1159e6f66", id: "36VmYpyliLjwhgdJgtzklq" },
    { name: "Dándole (Afro House Remix)", img: "ab67616d0000b273411f916a91d0a1b0fc5d5518", id: "3ye1Ez4iZuA3YmrXWRcSrm" },
    { name: "Gravity",        img: "ab67616d0000b273b96c0ec4fcdf345a79265cd0", id: "3qbwiN2x8YdzuUcRH1w5Zo" },
    { name: "Hold Me Now",    img: "ab67616d0000b2734374339849f8a7d7fb910721", id: "5ZHcuIlAiJOiVBOj4iW1cT" },
    { name: "Days & Nights",  img: "ab67616d0000b27381681b0ed00f70583ff4e91b", id: "7oTQAGx4ZKsSg3AyvORFkR" }
  ];

  function cardHTML(s) {
    return (
      '<a class="single" href="https://open.spotify.com/intl-es/track/' + s.id + '" target="_blank" rel="noopener" aria-label="Play ' + s.name + ' on Spotify">' +
        '<img src="https://i.scdn.co/image/' + s.img + '" alt="' + s.name + ' — cover art" loading="lazy" />' +
        '<span class="single__play" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>' +
        '<span class="single__overlay"><span class="micro">Single</span><span class="single__name">' + s.name + '</span></span>' +
      '</a>'
    );
  }

  var track = document.getElementById("marqueeTrack");
  if (track) {
    var html = SINGLES.map(cardHTML).join("");
    track.innerHTML = html + html; // duplicate set for seamless loop
  }

  /* ---- Hero photo fade-in ---- */
  var heroPhoto = document.getElementById("heroPhoto");
  if (heroPhoto) {
    if (heroPhoto.complete) heroPhoto.classList.add("loaded");
    else heroPhoto.addEventListener("load", function () { heroPhoto.classList.add("loaded"); });
  }

  /* ---- Nav: scrolled state + mobile menu ---- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Pointer effects (skip on touch / reduced-motion) ---- */
  var fine = window.matchMedia("(pointer:fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  if (fine && !reduce) {
    /* Cursor glow */
    var glow = document.querySelector(".cursor-glow");
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, cx = gx, cy = gy;
    window.addEventListener("mousemove", function (e) {
      gx = e.clientX; gy = e.clientY;
      if (glow.style.opacity !== "1") glow.style.opacity = "1";
    });
    (function loop() {
      cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
      glow.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();

    /* Hero parallax + release card tilt */
    var heroPhotoEl = heroPhoto;
    var card = document.getElementById("releaseCard");
    var hero = document.querySelector(".hero");
    if (hero) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        if (heroPhotoEl) heroPhotoEl.style.transform = "scale(1.06) translate(" + (-px * 22) + "px," + (-py * 18) + "px)";
        if (card) card.style.transform = "perspective(900px) rotateY(" + (px * 7) + "deg) rotateX(" + (-py * 7) + "deg)";
      });
      hero.addEventListener("mouseleave", function () {
        if (heroPhotoEl) heroPhotoEl.style.transform = "";
        if (card) card.style.transform = "";
      });
    }

    /* Tilt for .tilt cards (videos) */
    document.querySelectorAll(".tilt").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(800px) translateY(-8px) rotateY(" + (px * 5) + "deg) rotateX(" + (-py * 5) + "deg)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
