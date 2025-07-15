document.addEventListener('DOMContentLoaded', () => {
  fetch('../data/trustees.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(trustees => initCarousel(trustees))
    .catch(console.error);
});

function initCarousel(items) {
  const carousel = document.querySelector('.trustee-carousel');
  let current = 0;

  // Build slides
  items.forEach(t => {
    const card = document.createElement('div');
    card.className = 'trustee-card';
    card.innerHTML = `
      <img src="${t.image}" alt="${t.name}" />
      <h3>${t.name}</h3>
      <p class="role">${t.role}</p>
      <p class="bio">${t.bio}</p>
    `;
    carousel.appendChild(card);
  });

  // Slide controls
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  prev.addEventListener('click', () => slide(-1));
  next.addEventListener('click', () => slide(1));

  // Auto‐slide every 5s
  setInterval(() => slide(1), 5000);

  // Adjust on resize
  window.addEventListener('resize', updateView);

  updateView();

  function slide(dir) {
    current = (current + dir + items.length) % items.length;
    updateView();
  }

  function updateView() {
    const width = carousel.clientWidth;
    carousel.style.transform = `translateX(-${current * width}px)`;
  }
}