/* ================== SETTINGS ================== */

const COLORS = [
  '#a6c0e5', '#96b8e7', '#849acc', '#c09fa6', '#c3b3a8', '#c8c1b0',
  '#c37e83', '#bf7d6d', '#afa56a', '#9c8e69', '#c0b270', '#c28f70',
  '#c48d7e', '#c69a90', '#9f726d', '#aa8991', '#af93b9', '#ab88cc',
  '#bc9cd1', '#e2babb', '#bba6de', '#c1b88f', '#b49798', '#a498ac',
  '#6182d1', '#779edd', '#b1c5dd', '#8c758c', '#86566e', '#986e7c',
  '#bc6784', '#a56482', '#95607e', '#e6cf8b', '#ebc197', '#e7aba3',
  '#e6a48c', '#e1d27d', '#d5ba77', '#a185b5', '#b8aa83', '#c0b062'
];

const TILE_SIZE = 80; // Bigger = fewer tiles

const STEP = 120; // Bigger = slower wave
const JITTER = 40; // So blocks disappear one at a time
const BLOCK_FADE = 140; // how long each single block takes to change
const PAUSE = 200;  // ms to wait before the next wave

/* ================== GRID + ANIMATION ================== */
const wrapper = document.getElementById('tiles');

if (wrapper) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let columns = 0, rows = 0;
  let toWhite = false;
  let running = null;
  let timer = null;
  let lastWidth = 0;

  const randomTileColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  function createGrid() {
    clearTimeout(timer);
    if (running) running.pause();
    wrapper.innerHTML = '';

    columns = Math.max(1, Math.ceil(wrapper.clientWidth / TILE_SIZE));
    rows = Math.max(1, Math.ceil(wrapper.clientHeight / TILE_SIZE));
    wrapper.style.setProperty('--columns', columns);
    wrapper.style.setProperty('--rows', rows);

    for (let i = 0; i < columns * rows; i++) {
      const tile = document.createElement('div');
      tile.className = 'grid-tile';
      tile.style.setProperty('--color', randomTileColor());
      wrapper.appendChild(tile);
    }

    toWhite = false;
    if (!reduceMotion) waveLoop();
  }

  function waveLoop() {
    toWhite = !toWhite;
    const stagger = anime.stagger(STEP, { grid: [columns, rows], from: 'first' });

    running = anime({
      targets: '#tiles .grid-tile',
      opacity: toWhite ? 0 : 1,       // 0 = white (background shows through), 1 = back to color
      easing: 'linear',
      duration: BLOCK_FADE,
      delay: (el, i, total) => stagger(el, i, total) + Math.random() * JITTER,
      complete: () => { timer = setTimeout(waveLoop, PAUSE); }
    });
  }

  createGrid();

  lastWidth = wrapper.clientWidth;
  new ResizeObserver(() => {
    if (wrapper.clientWidth !== lastWidth) {
      lastWidth = wrapper.clientWidth;
      createGrid();
    }
  }).observe(wrapper);
}