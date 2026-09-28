/**
 * Valorant Roast Deck - Frontend Controller
 * Supports Server Region selection (NA, EU, AP, KR, etc.)
 * Handles form validation, API calls, and pointer swipe gestures (Touch + Mouse).
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const roastForm = document.getElementById('roast-form');
  const regionSelect = document.getElementById('player-region');
  const nameInput = document.getElementById('player-name');
  const tagInput = document.getElementById('player-tag');
  const submitBtn = document.getElementById('submit-btn');
  const errorBanner = document.getElementById('error-banner');
  const errorMessage = document.getElementById('error-message');

  const resultsSection = document.getElementById('results-section');
  const playerLabel = document.getElementById('player-label');
  const currentCardNum = document.getElementById('current-card-num');
  const totalCardsNum = document.getElementById('total-cards-num');
  const cardViewport = document.getElementById('card-viewport');
  const cardStack = document.getElementById('card-stack');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicatorsContainer = document.getElementById('indicators');
  const newSearchBtn = document.getElementById('new-search-btn');
  const chipButtons = document.querySelectorAll('.chip-btn');

  // State
  let currentCards = [];
  let activeIndex = 0;
  let isPointerDown = false;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;
  const SWIPE_THRESHOLD = 75;

  // 1. Auto-split if user pastes "Name#TAG" into the name field
  nameInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.includes('#')) {
      const parts = val.split('#');
      nameInput.value = parts[0].trim();
      tagInput.value = parts[1].trim();
      tagInput.focus();
    }
  });

  // Sample Chips
  chipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      nameInput.value = btn.dataset.name;
      tagInput.value = btn.dataset.tag;
      if (btn.dataset.region) {
        regionSelect.value = btn.dataset.region;
      }
      roastForm.dispatchEvent(new Event('submit'));
    });
  });

  // 2. Form Submission & API Fetching
  roastForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const region = regionSelect.value;
    const name = nameInput.value.trim();
    const tag = tagInput.value.trim().replace(/^#/, '');

    if (!name) {
      showError("Please enter your Riot ID name.");
      nameInput.focus();
      return;
    }
    if (!tag) {
      showError("Please enter your tagline (e.g. 0001 or NA1).");
      tagInput.focus();
      return;
    }

    setLoading(true);

    try {
      const url = `/api/roast/${encodeURIComponent(name)}/${encodeURIComponent(tag)}?region=${encodeURIComponent(region)}`;
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.msg || "Failed to fetch roast data.");
      }

      currentCards = result.data.cards;
      playerLabel.textContent = `${result.data.player.name}#${result.data.player.tag} [${result.data.player.region}]`;
      renderDeck(currentCards);

      resultsSection.classList.remove('hidden');
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  });

  // 3. Render Card Stack
  function renderDeck(cards) {
    activeIndex = 0;
    cardStack.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    totalCardsNum.textContent = cards.length;

    cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'roast-card';
      cardEl.id = `card-${index}`;
      cardEl.setAttribute('data-index', index);

      const iconHtml =
  card.icon && card.icon.startsWith('https://media.valorant-api.com/')
    ? `<img class="stat-icon" src="${card.icon}" alt="" loading="lazy">`
    : '';

      cardEl.innerHTML = `
        <div class="card-top">
          <div class="card-category-wrap">
            <span class="card-category">${escapeHtml(card.subtitle || card.title)}</span>
            <h2 class="card-title">${escapeHtml(card.title)}</h2>
          </div>
          <span class="card-type-pill">
            ${escapeHtml(card.type)}
          </span>
        </div>

        <div class="card-stat-block">
        <div class="stat-headline">${iconHtml}<span>${escapeHtml(card.headline)}</span></div>
          <div class="stat-subhighlight">
            ${escapeHtml(card.statHighlight)}
          </div>
        </div>

        <div class="card-roast-block">
          <p class="roast-quote">"${escapeHtml(card.roast)}"</p>
        </div>

        <div class="card-bottom">
          <span class="metric-label">${escapeHtml(card.metricLabel || "Metric")}</span>
          <span class="metric-value">${escapeHtml(card.metricValue || "")}</span>
        </div>
      `;

      cardStack.appendChild(cardEl);
      cardEl.querySelectorAll('.stat-icon').forEach(img =>
  img.addEventListener('error', () => img.remove())
);

      const dot = document.createElement('button');
      dot.className = `dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to card ${index + 1}`);
      dot.addEventListener('click', () => goToCard(index));
      indicatorsContainer.appendChild(dot);
    });

    updateStackPositions();
    attachPointerGestures();
  }

  // 4. Stack Positioning and Transitions
  function updateStackPositions() {
    const cardEls = document.querySelectorAll('.roast-card');
    const dots = document.querySelectorAll('.dot');

    currentCardNum.textContent = activeIndex + 1;
    prevBtn.disabled = activeIndex === 0;
    nextBtn.disabled = activeIndex === currentCards.length - 1;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });

    cardEls.forEach((cardEl, idx) => {
      const depth = idx - activeIndex;

      cardEl.style.transform = '';
      cardEl.style.opacity = '';
      cardEl.classList.remove('swiping');

      if (depth < 0) {
        cardEl.style.transform = 'translateX(-120%) rotate(-20deg)';
        cardEl.style.opacity = '0';
        cardEl.style.pointerEvents = 'none';
        cardEl.setAttribute('data-depth', '-1');
      } else if (depth <= 3) {
        cardEl.classList.remove('hidden-card');
        cardEl.setAttribute('data-depth', depth);
      } else {
        cardEl.classList.add('hidden-card');
        cardEl.setAttribute('data-depth', depth);
      }
    });
  }

  function goToCard(targetIndex) {
    if (targetIndex < 0 || targetIndex >= currentCards.length) return;
    activeIndex = targetIndex;
    updateStackPositions();
  }

  prevBtn.addEventListener('click', () => {
    if (activeIndex > 0) goToCard(activeIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (activeIndex < currentCards.length - 1) goToCard(activeIndex + 1);
  });

  window.addEventListener('keydown', (e) => {
    if (resultsSection.classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  newSearchBtn.addEventListener('click', () => {
    nameInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 5. Swipe Gestures
  function attachPointerGestures() {
    cardViewport.onpointerdown = handlePointerDown;
    cardViewport.onpointermove = handlePointerMove;
    cardViewport.onpointerup = handlePointerUp;
    cardViewport.onpointercancel = handlePointerUp;
  }

  function getActiveCardEl() {
    return document.querySelector(`.roast-card[data-index="${activeIndex}"]`);
  }

  function handlePointerDown(e) {
    const cardEl = getActiveCardEl();
    if (!cardEl) return;

    isPointerDown = true;
    startX = e.clientX;
    startY = e.clientY;
    deltaX = 0;
    deltaY = 0;

    cardEl.classList.add('swiping');
    cardViewport.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!isPointerDown) return;
    const cardEl = getActiveCardEl();
    if (!cardEl) return;

    deltaX = e.clientX - startX;
    deltaY = e.clientY - startY;

    const rotation = deltaX * 0.06;
    cardEl.style.transform = `translate(${deltaX}px, ${deltaY * 0.25}px) rotate(${rotation}deg)`;

    const progress = Math.min(Math.abs(deltaX) / (SWIPE_THRESHOLD * 2), 1);
    cardEl.style.opacity = `${1 - progress * 0.35}`;
  }

  function handlePointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;

    const cardEl = getActiveCardEl();
    if (!cardEl) return;

    cardEl.classList.remove('swiping');

    if (deltaX < -SWIPE_THRESHOLD) {
      if (activeIndex < currentCards.length - 1) {
        cardEl.style.transform = 'translateX(-120%) rotate(-25deg)';
        cardEl.style.opacity = '0';
        setTimeout(() => {
          activeIndex++;
          updateStackPositions();
        }, 180);
        return;
      }
    } else if (deltaX > SWIPE_THRESHOLD) {
      if (activeIndex > 0) {
        activeIndex--;
        updateStackPositions();
        return;
      }
    }

    cardEl.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    cardEl.style.opacity = '1';
  }

  function setLoading(loading) {
    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  function showError(msg) {
    errorMessage.textContent = msg;
    errorBanner.classList.remove('hidden');
    errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function hideError() {
    errorBanner.classList.add('hidden');
    errorMessage.textContent = '';
  }

  function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
