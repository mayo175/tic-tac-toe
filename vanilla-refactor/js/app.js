import View from "./view.js";

const App = {
  //all of the selected html elements
  $: {
    menu: document.querySelector('[data-id = "menu"]'),
    menuItems: document.querySelector('[data-id = "menu-items"]'),
    resetBtn: document.querySelector('[data-id = "resetBtn"]'),
    newRoundBtn: document.querySelector('[data-id = "newRoundBtn"]'),
    squares: document.querySelectorAll('[data-id = "square"]'),
    modal: document.querySelector('[data-id = "modal"]'),
    modalContents: document.querySelector('[data-id = "modal-contents"]'),
    modalText: document.querySelector('[data-id = "modal-text"]'),
    modalBtn: document.querySelector('[data-id = "modal-btn"]'),
    turn: document.querySelector('[data-id = "turn"]'),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves
      .filter((move) => move.playerId === 1)
      .map((move) => +move.squareId);
    const p2Moves = moves
      .filter((move) => move.playerId === 2)
      .map((move) => +move.squareId);

    console.log(p1Moves);
    console.log(p2Moves);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((v) => p1Moves.includes(v));
      const p2Wins = pattern.every((v) => p2Moves.includes(v));

      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });

    return {
      status: moves.length === 9 || winner != null ? "complete" : "in-progess", // in-progress or complete
      winner, //1 or 2 or null
    };
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    // toggle menu DONE
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    //reset game todo
    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset the game");
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
    });

    //new round todo
    App.$.newRoundBtn.addEventListener("click", (event) => {
      console.log("New round");
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
    });

    //modal button: Play again todo
    App.$.modalBtn.addEventListener("click", (event) => {
      App.state.moves = [];
      App.$.squares.forEach((square) => square.replaceChildren());
      App.$.modal.classList.add("hidden");
    });

    //click square todo
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        //check if the square is already marked
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        //determine which player icon to be added to the square
        const lastMove = App.state.moves.at(-1);
        const opponent = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0 ? 1 : opponent(lastMove.playerId);

        const nextplayer = opponent(currentPlayer);

        const squareIcon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnLabel = document.createElement("p");
        turnLabel.innerText =
          App.state.moves.length === 0
            ? "Player 1, you are up!"
            : `Player ${nextplayer}, you are up!`;

        if (currentPlayer === 1) {
          squareIcon.classList.add("fa-solid", "fa-x", "yellow");
          turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnLabel.classList.add("turquoise");
        } else {
          squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-xmark", "yellow");
          turnLabel.classList.add("yellow");
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel);

        App.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        square.replaceChildren(squareIcon);

        //check if win  or tie
        const game = App.getGameStatus(App.state.moves);

        // console.log(status);
        if (game.status === "complete") {
          App.$.modal.classList.remove("hidden");

          let msg = " ";
          if (game.winner) {
            msg = `Player ${game.winner} wins!`;
          } else {
            msg = "Tie!";
          }
          App.$.modalText.textContent = msg;
        }
      });
    });
  },
};

// const menu = document.querySelector(".menu");
// const menuItems = menu.querySelector(".items");

window.addEventListener("load", App.init);

function init() {
  const view = new View();
  console.log(view.$.turn);
}

window.addEventListener("load", init());
