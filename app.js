// ── Word list ─────────────────────────────────────────────
const WORDS = [
  'Pizza', 'Surfboard', 'Library', 'Volcano', 'Submarine',
  'Dentist', 'Rollercoaster', 'Sushi', 'Telescope', 'Igloo',
  'Helicopter', 'Circus', 'Aquarium', 'Karate', 'Trampoline',
  'Lighthouse', 'Accordion', 'Cactus', 'Hammock', 'Waterfall',
  'Sauna', 'Escalator', 'Bowling', 'Penguin', 'Fireworks',
];

// ── State ─────────────────────────────────────────────────
let players = [];
let impostorIndex = -1;
let secretWord = '';
let currentRevealIndex = 0;

// ── DOM refs ──────────────────────────────────────────────
const playerInput   = document.getElementById('player-input');
const addBtn        = document.getElementById('add-player-btn');
const playerListEl  = document.getElementById('player-list');
const startBtn      = document.getElementById('start-game-btn');

const currentNameEl = document.getElementById('current-player-name');
const roleCard      = document.getElementById('role-card');
const roleLabelEl   = document.getElementById('role-label');
const roleWordEl    = document.getElementById('role-word');
const nextBtn       = document.getElementById('next-btn');

// ── Helpers ───────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

// ── Setup screen ──────────────────────────────────────────
function renderPlayerList() {
  playerListEl.innerHTML = '';
  players.forEach((name, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${name}</span>
      <button class="remove-btn" onclick="removePlayer(${i})" aria-label="Remove">✕</button>
    `;
    playerListEl.appendChild(li);
  });
  startBtn.disabled = players.length < 3;
}

function addPlayer() {
  const name = playerInput.value.trim();
  if (!name) return;
  if (players.includes(name)) {
    playerInput.select();
    return;
  }
  players.push(name);
  playerInput.value = '';
  playerInput.focus();
  renderPlayerList();
}

function removePlayer(index) {
  players.splice(index, 1);
  renderPlayerList();
}

addBtn.addEventListener('click', addPlayer);
playerInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addPlayer();
});

// ── Start game ────────────────────────────────────────────
startBtn.addEventListener('click', () => {
  // Shuffle players for random reveal order
  players = players.sort(() => Math.random() - 0.5);
  impostorIndex = rand(players.length);
  secretWord = WORDS[rand(WORDS.length)];
  currentRevealIndex = 0;

  loadRevealScreen(currentRevealIndex);
  showScreen('screen-reveal');
});

// ── Reveal screen ─────────────────────────────────────────
function loadRevealScreen(index) {
  const name = players[index];
  currentNameEl.textContent = name;

  // Reset card to hidden state
  roleCard.classList.remove('card-revealed', 'card-impostor');
  roleCard.classList.add('card-hidden');
  roleCard.style.pointerEvents = 'auto';

  // Hide next button
  nextBtn.classList.add('hidden');

  if (index === impostorIndex) {
    roleLabelEl.textContent = '⚠️ You are the';
    roleWordEl.textContent = 'IMPOSTOR';
  } else {
    roleLabelEl.textContent = '🔑 The word is';
    roleWordEl.textContent = secretWord;
  }
}

function revealRole() {
  // Flip the card
  roleCard.classList.remove('card-hidden');
  roleCard.classList.add('card-revealed');
  roleCard.style.pointerEvents = 'none'; // prevent double-tap

  if (currentRevealIndex === impostorIndex) {
    roleCard.classList.add('card-impostor');
  }

  // Show next/done button after a short delay (let card finish flipping)
  setTimeout(() => {
    nextBtn.classList.remove('hidden');
    const isLast = currentRevealIndex === players.length - 1;
    nextBtn.textContent = isLast ? 'Everyone is ready — Start!' : 'Done — Pass the device';
  }, 400);
}

function nextPlayer() {
  currentRevealIndex++;
  if (currentRevealIndex >= players.length) {
    showScreen('screen-game');
  } else {
    loadRevealScreen(currentRevealIndex);
  }
}

// ── Reset ─────────────────────────────────────────────────
function resetGame() {
  players = [];
  impostorIndex = -1;
  secretWord = '';
  currentRevealIndex = 0;
  renderPlayerList();
  playerInput.value = '';
  showScreen('screen-setup');
}
