/* ---------------------------------------------------------
   1. 요소 선택 
   --------------------------------------------------------- */
const guessInput = document.querySelector('.guess-input');
const guessBtn = document.querySelector('.guess-btn');
const message = document.querySelector('.message');
const chanceCount = document.querySelector('.chance-count');
const triedText = document.querySelector('.tried');
const restartBtn = document.querySelector('.restart-btn');


/* ---------------------------------------------------------
   2. 변수 선언
   --------------------------------------------------------- */
   const MAX_CHANCE = 5; // 최대 기회

   let answer;         // 정답
   let chance;         // 남은 기회
   let tried;   // 시도한 숫자 기록

/* ---------------------------------------------------------
   3. 게임 시작 함수 startGame()
      처음 페이지를 열 때와 [다시 시작]을 누를 때 모두 호출한다.
   --------------------------------------------------------- */
function startGame() {
   //랜덤 수 생성
   answer = Math.floor(Math.random() * 100) + 1;

   tried = '';
   chance = MAX_CHANCE;

   //화면의 처음 상태로 되돌린다.
   chanceCount.textContent = chance;
   message.textContent = "숫자를 입력하고 [확인]을 눌러 보세요.";
   message.classList.remove('win','lose');
   triedText.textContent = '입력한 숫자 : 없음';

   guessInput.disabled = false;
   guessBtn.disabled = false;
   guessInput.value = '';
   restartBtn.classList.remove('show');
   guessInput.focus();
}


/* ---------------------------------------------------------
   4. 게임 종료 함수 endGame()
      맞혔을 때와 기회를 모두 썼을 때 공통으로 하는 일
   --------------------------------------------------------- */
function endGame() {
   guessInput.disabled = true;
   guessBtn.disabled = true;
   restartBtn.classList.add('show');
}


/* ---------------------------------------------------------
   5. 숫자 확인 함수 checkGuess()  — 이 게임의 핵심
   --------------------------------------------------------- */
function checkGuess() {
  // input.value 는 항상 '글자'이다. 계산·비교하려면 숫자로 바꿔야 한다.
  const guess = Number(guessInput.value);

  // (1) 입력값 검사: 잘못된 입력이면 기회를 쓰지 않고 안내만 한다.
  //     빈 칸이거나, 정수가 아니거나, 1~100 범위를 벗어난 경우
   if (guessInput.value === '' || guess < 1 || guess > 100 || !Number.isInteger(guess)) {
     message.textContent = "1에서 100 사이의 정수를 입력해주세요.";
     guessInput.value = '';
     guessInput.focus();
     return;   //함수 종료. 아래 코드는 실행 안됨.
   }

  // (2) 올바른 입력이므로 기회를 하나 쓰고, 입력 기록에 추가한다.
   chance--;
   tried += guess + ' ';
   triedText.textContent = '입력한 숫자 : ' + tried;
   chanceCount.textContent = chance;

  // (3) 결과 판단 — 위에서부터 순서대로 검사하고, 처음으로 참인 것만 실행된다.
   if (guess === answer) {
     message.textContent = '축하합니다! 정답입니다.' +(MAX_CHANCE - chance)+'번 만에 맞혔어요.';
     message.classList.add('win');
     endGame();
   } else if (chance === 0) {
     message.textContent = `기회를 모두 소모했습니다. 정답은 ${answer}였습니다.`;
     message.classList.add('lose');
     endGame();
   } else {
     message.textContent = guess < answer ? `${guess}보다 더 커요!.` : `${guess}보다 더 작아요!.`;
   }

  // (4) 다음 입력을 위해 입력창을 비우고 커서를 둔다.
   guessInput.value = "";
   guessInput.focus();
}


/* ---------------------------------------------------------
   6. 이벤트 연결
      같은 함수 checkGuess 를 '버튼 클릭'과 'Enter 키' 두 곳에 연결한다..
   --------------------------------------------------------- */
   guessBtn.addEventListener('click', checkGuess);
   guessInput.addEventListener('keypress', (event) => {
     if (event.key === 'Enter') {
       checkGuess();
     }
   });
   
   restartBtn.addEventListener('click', function() {
     startGame();
   });

   
/* ---------------------------------------------------------
   7. 페이지를 열자마자 게임을 시작한다.
   --------------------------------------------------------- */
   startGame();
