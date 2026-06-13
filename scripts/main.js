/* NextDoor Leads — Shared JS */

(function () {
  'use strict';

  // === NAV SCROLL BEHAVIOR ===
  const nav = document.querySelector('.nav');
  if (nav) {
    function handleScroll() {
      if (window.scrollY > 30) {
        nav.classList.remove('nav--top');
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.add('nav--top');
        nav.classList.remove('is-scrolled');
      }
    }
    nav.classList.add('nav--top');
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // === MOBILE HAMBURGER MENU ===
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));

      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });
  }

  // === HIGHLIGHT TODAY'S HOURS ===
  var dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var todayKey = dayKeys[new Date().getDay()];
  document.querySelectorAll('tr[data-day="' + todayKey + '"]').forEach(function (row) {
    row.classList.add('today');
  });

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
