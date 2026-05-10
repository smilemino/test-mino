const FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const BEST_KEY = 'dice-best-sum';
let rolls = 0;
let sum = 0;
let best = Number(localStorage.getItem(BEST_KEY) || 0);
let rolling = false;

document.getElementById('best').textContent = best;

function roll() {
  if (rolling) return;
  rolling = true;
  const dice = document.getElementById('dice');
  const btn  = document.getElementById('rollBtn');
  const result = document.getElementById('result');
  btn.disabled = true;
  dice.classList.add('rolling');
  result.textContent = '굴리는 중...';

  const spin = setInterval(() => {
    dice.textContent = FACES[Math.floor(Math.random() * 6)];
  }, 60);

  setTimeout(() => {
    clearInterval(spin);
    const n = Math.floor(Math.random() * 6) + 1;
    dice.textContent = FACES[n - 1];
    dice.classList.remove('rolling');
    rolls++;
    sum += n;
    document.getElementById('rolls').textContent = rolls;
    document.getElementById('sum').textContent = sum;
    result.textContent = `${n} 나왔습니다!`;
    if (sum > best) {
      best = sum;
      localStorage.setItem(BEST_KEY, String(best));
      document.getElementById('best').textContent = best;
    }
    btn.disabled = false;
    rolling = false;
  }, 800);
}

function resetAll() {
  if (rolling) return;
  rolls = 0;
  sum = 0;
  document.getElementById('rolls').textContent = 0;
  document.getElementById('sum').textContent = 0;
  document.getElementById('dice').textContent = FACES[0];
  document.getElementById('result').textContent = '굴려보세요';
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); roll(); }
  else if (e.key.toLowerCase() === 'r') resetAll();
});
