/* DRIK Tourism & Travel — Main JS */

(function () {
  'use strict';

  /* ─── HEADER SCROLL ─── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ─── MOBILE NAV ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  /* ─── ACTIVE NAV LINK ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── INTERSECTION OBSERVER ─── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* Hero immediate fade */
  document.querySelectorAll('.hero .fade-in, .page-hero .fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 150 + i * 120);
  });

  /* ─── HERO SLIDER ─── */
  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  let heroIndex = 0;
  let heroTimer;

  function setHeroSlide(i) {
    if (!heroSlides.length) return;
    heroIndex = i;
    heroSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    heroDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  function nextHeroSlide() {
    setHeroSlide((heroIndex + 1) % heroSlides.length);
  }

  if (heroSlides.length > 1) {
    heroTimer = setInterval(nextHeroSlide, 6000);
    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(heroTimer);
        setHeroSlide(i);
        heroTimer = setInterval(nextHeroSlide, 6000);
      });
    });
  }


  /* ─── INSTAGRAM STORIES (inline + loop) ─── */
  const STORY_DURATION = 5000;
  const storyKeys = ['tunisie', 'turquie', 'thailande', 'russie', 'malaisie', 'grece'];

  const storiesData = {
    tunisie: {
      name: 'Tunisie 🇹🇳',
      avatar: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80&auto=format&fit=crop', title: 'Tunis — Médina & Culture', text: 'À seulement 1h de vol depuis Alger, découvrez la perle du Maghreb.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1558642452-9d2a7aff7b62?w=800&q=80&auto=format&fit=crop', title: 'Hammamet & Sousse', text: 'Plages dorées et hôtels 4★ inclus dans nos forfaits tout compris.', cta: 'contact.html' },
        { img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop', title: 'Djerba — Île des Rêves', text: 'Circuit 5 jours dès 85 000 DA. Départ chaque vendredi.', cta: 'contact.html' }
      ]
    },
    turquie: {
      name: 'Turquie 🇹🇷',
      avatar: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&auto=format&fit=crop', title: 'Istanbul — Entre Deux Continents', text: 'Mosquées, bazars et Bosphore. Vol + hôtel + transferts inclus.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80&auto=format&fit=crop', title: 'Cappadoce — Montgolfière', text: 'Paysages lunaires et cheminées de fées. Expérience inoubliable.', cta: 'contact.html' },
        { img: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4ab9?w=800&q=80&auto=format&fit=crop', title: 'Antalya — Riviera Turque', text: 'Séjour balnéaire 7 nuits. Pension complète disponible.', cta: 'contact.html' }
      ]
    },
    thailande: {
      name: 'Thaïlande 🇹🇭',
      avatar: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80&auto=format&fit=crop', title: 'Bangkok — Temples Dorés', text: 'Capitale vibrante entre tradition et modernité.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80&auto=format&fit=crop', title: 'Phuket — Plages Paradisiaques', text: 'Eaux turquoise et resorts de luxe. Circuit 10 jours.', cta: 'contact.html' }
      ]
    },
    russie: {
      name: 'Russie 🇷🇺',
      avatar: 'https://images.unsplash.com/photo-1513326738677-b964753b066d?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1513326738677-b964753b066d?w=800&q=80&auto=format&fit=crop', title: 'Moscou — Place Rouge', text: 'Kremlin, cathédrale Saint-Basile et métro artistique.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1556610961-2feccfc90530?w=800&q=80&auto=format&fit=crop', title: 'Saint-Pétersbourg', text: 'Palais d\'été, musée de l\'Ermitage. Voyage culturel premium.', cta: 'contact.html' }
      ]
    },
    malaisie: {
      name: 'Malaisie 🇲🇾',
      avatar: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&auto=format&fit=crop', title: 'Kuala Lumpur — Tours Jumelles', text: 'Architecture futuriste et street food légendaire.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1585409678173-9fbb9a4c09e4?w=800&q=80&auto=format&fit=crop', title: 'Langkawi — Îles Tropicales', text: 'Nature luxuriante et plages de sable blanc.', cta: 'contact.html' }
      ]
    },
    grece: {
      name: 'Grèce 🇬🇷',
      avatar: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d325?w=200&q=80&auto=format&fit=crop',
      slides: [
        { img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d325?w=800&q=80&auto=format&fit=crop', title: 'Santorin — Couchers de Soleil', text: 'Villages blancs et dômes bleus. Lune de miel idéale.', cta: 'destinations.html' },
        { img: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80&auto=format&fit=crop', title: 'Athènes — Acropole', text: 'Berceau de la civilisation occidentale. Circuit 6 jours.', cta: 'contact.html' }
      ]
    }
  };

  const storiesPlayer = document.getElementById('storiesPlayer');
  let currentStoryKeyIndex = 0;
  let currentSlideIndex = 0;
  let lastRenderedKey = null;
  let storyTimer = null;
  let storyLoopActive = false;

  function getCurrentStoryKey() {
    return storyKeys[currentStoryKeyIndex];
  }

  function getCurrentStory() {
    return storiesData[getCurrentStoryKey()];
  }

  function updateActiveRing() {
    const key = getCurrentStoryKey();
    document.querySelectorAll('.story-ring[data-story]').forEach(ring => {
      ring.classList.toggle('story-ring--active', ring.dataset.story === key);
    });
  }

  function renderStorySlides(key) {
    const story = storiesData[key];
    const slidesEl = document.getElementById('storySlides');
    if (!slidesEl || !story) return;

    slidesEl.innerHTML = story.slides.map((slide, i) => `
      <div class="story-slide" data-index="${i}">
        <img src="${slide.img}" alt="${slide.title}" loading="lazy">
        <div class="story-slide__overlay"></div>
        <div class="story-slide__text">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <a href="${slide.cta}" class="btn btn--gold">Réserver ce voyage</a>
        </div>
      </div>
    `).join('');
  }

  function updateProgressBars(slideIndex) {
    const progressEl = document.getElementById('storyProgress');
    const story = getCurrentStory();
    if (!progressEl || !story) return;

    progressEl.innerHTML = story.slides.map((_, i) => {
      let fillClass = '';
      if (i < slideIndex) fillClass = 'done';
      else if (i === slideIndex) fillClass = 'active';
      return `<div class="story-viewer__bar"><div class="story-viewer__bar-fill ${fillClass}"></div></div>`;
    }).join('');

    if (slideIndex < story.slides.length) {
      const activeBar = progressEl.querySelector('.story-viewer__bar-fill.active');
      if (activeBar) {
        activeBar.style.animation = 'none';
        void activeBar.offsetWidth;
        activeBar.style.animation = '';
      }
    }
  }

  function showStoryAt(keyIndex, slideIndex, autoplay) {
    if (!storiesPlayer) return;

    currentStoryKeyIndex = ((keyIndex % storyKeys.length) + storyKeys.length) % storyKeys.length;
    const story = getCurrentStory();
    currentSlideIndex = Math.max(0, Math.min(slideIndex, story.slides.length - 1));
    const key = getCurrentStoryKey();

    if (lastRenderedKey !== key) {
      renderStorySlides(key);
      lastRenderedKey = key;
    }

    const avatar = document.getElementById('storyAvatar');
    const name = document.getElementById('storyName');
    const slideCount = document.getElementById('storySlideCount');
    if (avatar) avatar.src = story.avatar;
    if (name) name.textContent = story.name;
    if (slideCount) slideCount.textContent = `${currentSlideIndex + 1}/${story.slides.length}`;

    const slides = document.querySelectorAll('#storySlides .story-slide');
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlideIndex));

    updateProgressBars(currentSlideIndex);
    updateActiveRing();

    clearTimeout(storyTimer);
    if (autoplay && storyLoopActive) {
      storyTimer = setTimeout(advanceStory, STORY_DURATION);
    }
  }

  function advanceStory() {
    const story = getCurrentStory();
    if (currentSlideIndex < story.slides.length - 1) {
      showStoryAt(currentStoryKeyIndex, currentSlideIndex + 1, true);
    } else {
      showStoryAt(currentStoryKeyIndex + 1, 0, true);
    }
  }

  function retreatStory() {
    if (currentSlideIndex > 0) {
      showStoryAt(currentStoryKeyIndex, currentSlideIndex - 1, true);
    } else {
      const prevKeyIndex = (currentStoryKeyIndex - 1 + storyKeys.length) % storyKeys.length;
      const prevStory = storiesData[storyKeys[prevKeyIndex]];
      showStoryAt(prevKeyIndex, prevStory.slides.length - 1, true);
    }
  }

  function startStoryLoop() {
    if (!storiesPlayer) return;
    storyLoopActive = true;
    showStoryAt(currentStoryKeyIndex, currentSlideIndex, true);
  }

  function pauseStoryLoop() {
    storyLoopActive = false;
    clearTimeout(storyTimer);
  }

  if (storiesPlayer) {
    showStoryAt(0, 0, false);

    document.getElementById('storyPrev')?.addEventListener('click', () => {
      pauseStoryLoop();
      retreatStory();
      storyLoopActive = true;
      storyTimer = setTimeout(advanceStory, STORY_DURATION);
    });

    document.getElementById('storyNext')?.addEventListener('click', () => {
      pauseStoryLoop();
      advanceStory();
    });

    document.getElementById('storyTapLeft')?.addEventListener('click', () => {
      pauseStoryLoop();
      retreatStory();
      storyLoopActive = true;
      storyTimer = setTimeout(advanceStory, STORY_DURATION);
    });

    document.getElementById('storyTapRight')?.addEventListener('click', () => {
      pauseStoryLoop();
      advanceStory();
    });

    document.querySelectorAll('.story-ring[data-story]').forEach(ring => {
      ring.addEventListener('click', () => {
        const keyIndex = storyKeys.indexOf(ring.dataset.story);
        if (keyIndex === -1) return;
        pauseStoryLoop();
        showStoryAt(keyIndex, 0, true);
      });
    });

    const storiesSection = document.getElementById('destinations');
    if (storiesSection) {
      const storyObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) startStoryLoop();
          else pauseStoryLoop();
        });
      }, { threshold: 0.25 });
      storyObs.observe(storiesSection);
    } else {
      startStoryLoop();
    }
  }

  /* Modal stories (destinations.html) */
  const storyModal = document.getElementById('storyModal');
  let modalStoryKey = null;
  let modalSlideIndex = 0;
  let modalTimer = null;

  function openStoryModal(key) {
    if (!storyModal || !storiesData[key]) return;
    modalStoryKey = key;
    modalSlideIndex = 0;

    const viewer = storyModal.querySelector('.story-viewer');
    const story = storiesData[key];
    viewer.querySelector('.story-viewer__header-name').textContent = story.name;
    viewer.querySelector('.story-viewer__header img').src = story.avatar;

    viewer.querySelector('.story-viewer__progress').innerHTML = story.slides.map(() =>
      `<div class="story-viewer__bar"><div class="story-viewer__bar-fill"></div></div>`
    ).join('');

    viewer.querySelector('.story-viewer__slides').innerHTML = story.slides.map((slide, i) => `
      <div class="story-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
        <img src="${slide.img}" alt="${slide.title}">
        <div class="story-slide__overlay"></div>
        <div class="story-slide__text">
          <h3>${slide.title}</h3>
          <p>${slide.text}</p>
          <a href="${slide.cta}" class="btn btn--gold">Réserver ce voyage</a>
        </div>
      </div>
    `).join('');

    storyModal.classList.add('open');
    document.body.classList.add('menu-open');
    showModalSlide(0);
  }

  function showModalSlide(index) {
    if (!storyModal || !modalStoryKey) return;
    const story = storiesData[modalStoryKey];
    modalSlideIndex = index;
    const viewer = storyModal.querySelector('.story-viewer');

    viewer.querySelectorAll('.story-slide').forEach((s, i) => s.classList.toggle('active', i === index));
    viewer.querySelectorAll('.story-viewer__bar-fill').forEach((b, i) => {
      b.classList.remove('active', 'done');
      if (i < index) b.classList.add('done');
      if (i === index) {
        b.classList.add('active');
        b.style.animation = 'none';
        void b.offsetWidth;
        b.style.animation = '';
      }
    });

    clearTimeout(modalTimer);
    if (index < story.slides.length - 1) {
      modalTimer = setTimeout(() => showModalSlide(index + 1), STORY_DURATION);
    } else {
      const nextKeyIndex = (storyKeys.indexOf(modalStoryKey) + 1) % storyKeys.length;
      modalTimer = setTimeout(() => openStoryModal(storyKeys[nextKeyIndex]), STORY_DURATION);
    }
  }

  function closeStoryModal() {
    if (!storyModal) return;
    clearTimeout(modalTimer);
    storyModal.classList.remove('open');
    document.body.classList.remove('menu-open');
    modalStoryKey = null;
  }

  if (storyModal) {
    document.querySelectorAll('.story-ring[data-story]').forEach(ring => {
      if (!storiesPlayer) {
        ring.addEventListener('click', () => openStoryModal(ring.dataset.story));
      }
    });

    storyModal.querySelector('.story-viewer__close')?.addEventListener('click', closeStoryModal);
    storyModal.addEventListener('click', (e) => { if (e.target === storyModal) closeStoryModal(); });

    storyModal.querySelector('.story-viewer__tap-left')?.addEventListener('click', () => {
      if (modalSlideIndex > 0) showModalSlide(modalSlideIndex - 1);
      else {
        const prevKey = storyKeys[(storyKeys.indexOf(modalStoryKey) - 1 + storyKeys.length) % storyKeys.length];
        openStoryModal(prevKey);
        const prevStory = storiesData[prevKey];
        showModalSlide(prevStory.slides.length - 1);
      }
    });

    storyModal.querySelector('.story-viewer__tap-right')?.addEventListener('click', () => {
      const story = storiesData[modalStoryKey];
      if (modalSlideIndex < story.slides.length - 1) showModalSlide(modalSlideIndex + 1);
      else {
        const nextKey = storyKeys[(storyKeys.indexOf(modalStoryKey) + 1) % storyKeys.length];
        openStoryModal(nextKey);
      }
    });
  }

  /* ─── TESTIMONIALS SLIDER ─── */
  const testimonialTrack = document.querySelector('.testimonials-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let testimonialIndex = 0;

  function setTestimonial(i) {
    if (!testimonialTrack || !testimonialCards.length) return;
    testimonialIndex = i;
    testimonialTrack.style.transform = `translateX(-${i * 100}%)`;
  }

  document.getElementById('testimonialPrev')?.addEventListener('click', () => {
    setTestimonial((testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length);
  });
  document.getElementById('testimonialNext')?.addEventListener('click', () => {
    setTestimonial((testimonialIndex + 1) % testimonialCards.length);
  });

  if (testimonialCards.length > 1) {
    setInterval(() => {
      setTestimonial((testimonialIndex + 1) % testimonialCards.length);
    }, 7000);
  }

  /* ─── TABS ─── */
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tabs__btn');
    const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.dataset.tab === target));
      });
    });
  });

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ─── LIGHTBOX ─── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = el.dataset.lightbox || el.querySelector('img')?.src;
      lightbox.classList.add('open');
      document.body.classList.add('menu-open');
    });
  });

  lightbox?.querySelector('.lightbox__close')?.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });

  /* ─── CONTACT FORM ─── */
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    function showError(id, show) {
      const input = document.getElementById(id);
      const error = document.getElementById(id + 'Error');
      if (input) input.classList.toggle('error', show);
      if (error) error.classList.toggle('show', show);
      return !show;
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^[\d\s+()-]{8,}$/.test(phone.trim());
    }

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nom = document.getElementById('nom')?.value.trim() || '';
      const telephone = document.getElementById('telephone')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const service = document.getElementById('service')?.value || '';

      let valid = true;
      valid = showError('nom', nom.length < 2) && valid;
      valid = showError('telephone', !validatePhone(telephone)) && valid;
      valid = showError('email', !validateEmail(email)) && valid;
      valid = showError('service', !service) && valid;
      if (!valid) return;

      const formSuccess = document.getElementById('formSuccess');
      const contactForm = document.getElementById('contactForm');
      formSuccess?.classList.add('show');
      if (contactForm) contactForm.style.display = 'none';

      setTimeout(() => {
        if (contactForm) contactForm.style.display = '';
        formSuccess?.classList.remove('show');
        ['nom', 'telephone', 'email', 'message'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
        const svc = document.getElementById('service');
        if (svc) svc.value = '';
      }, 5000);
    });

    ['nom', 'telephone', 'email', 'service'].forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('input', () => showError(id, false));
      el?.addEventListener('change', () => showError(id, false));
    });
  }

})();
