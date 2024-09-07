// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// 게임 초기화 및 상태
let scores, currentScore, activePlayer, playing;

//초기화 함수
const init = function () {
  scores = [0, 0]; // 두 플레이어의 점수를 0으로 초기화
  currentScore = 0; // 현재 라운드의 점수도 0으로 초기화
  activePlayer = 0; // 첫 번째 플레이어 부터 시작
  playing = true;

  //UI초기화
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden"); //주사위 이미지 숨기기

  //플레이어 스타일 초기화
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

//플레이어 전환함수
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //현재 점수를 0으로
  currentScore = 0; //라운드 점수 초기화
  activePlayer = activePlayer === 0 ? 1 : 0; //플레이어 전환
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//주사위 굴리기 버튼 이벤트 핸들러
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // 주사위 결과 생성
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //주사위 이미지 업데이트

    if (dice !== 1) {
      currentScore += dice; //1이 아니면 현재 점수에 추가
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer(); //1이면 플레이어 전환
    }
  }
});

//점수유지 버튼 이벤트 핸들러
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; //현재 점수를 총 점수에 추가
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      // Show alert with 'Winner!' message
      alert(`Player ${activePlayer + 1} is the Winner!`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--winner");
    } else {
      switchPlayer(); //그렇지 않으면 플레이어 전환
    }
  }
});

btnNew.addEventListener("click", init);
