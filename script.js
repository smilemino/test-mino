const EMOJI   = { rock: '✊', scissors: '✌️', paper: '🖐️' };
const CHOICES = ['rock', 'scissors', 'paper'];
let score = { user: 0, comp: 0, draw: 0 };

function play(userPick) {
  const compPick = CHOICES[Math.floor(Math.random() * 3)];
  const outcome  = judge(userPick, compPick);

  setDisplay('userChoice', EMOJI[userPick]);
  setDisplay('compChoice', EMOJI[compPick]);

  if (outcome === 'win')       { score.user++; showResult('win',  '이겼습니다! 🎉'); }
  else if (outcome === 'lose') { score.comp++; showResult('lose', '졌습니다 😢'); }
  else                         { score.draw++; showResult('draw', '비겼습니다 🤝'); }

  document.getElementById('scoreUser').textContent = score.user;
  document.getElementById('scoreComp').textContent = score.comp;
  document.getElementById('scoreDraw').textContent = score.draw;
}

function judge(u, c) {
  if (u === c) return 'draw';
  if ((u==='rock'&&c==='scissors') || (u==='scissors'&&c==='paper') || (u==='paper'&&c==='rock')) return 'win';
  return 'lose';
}

function showResult(cls, msg) {
  const el = document.getElementById('result');
  el.className = 'result ' + cls;
  el.textContent = msg;
}

function setDisplay(id, emoji) {
  const el = document.getElementById(id);
  el.textContent = emoji;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function reset() {
  document.getElementById('userChoice').textContent = '✊';
  document.getElementById('compChoice').textContent = '✊';
  const el = document.getElementById('result');
  el.className = 'result';
  el.textContent = '선택하세요';
}

function resetAll() {
  score = { user: 0, comp: 0, draw: 0 };
  document.getElementById('scoreUser').textContent = 0;
  document.getElementById('scoreComp').textContent = 0;
  document.getElementById('scoreDraw').textContent = 0;
  reset();
}

document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (k === '1') play('rock');
  else if (k === '2') play('scissors');
  else if (k === '3') play('paper');
  else if (k === 'r') reset();
});
