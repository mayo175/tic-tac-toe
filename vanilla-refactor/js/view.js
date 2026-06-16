export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id = "menu"]');
    this.$.menuBtn = this.#qs('[data-id = "menuBtn"]')
    this.$.menuItems = this.#qs('[data-id = "menu-items"]');
    this.$.resetBtn = this.#qs('[data-id = "resetBtn"]');    this.$.newRoundBtn = this.#qs('[data-id = "newRoundBtn"]');
    this.$.modal = this.#qs('[data-id = "modal"]');
    this.$.modalContents = this.#qs(
      '[data-id = "modal-contents"]'
    );
    this.$.modalText = this.#qs('[data-id = "modal-text"]');
    this.$.modalBtn = this.#qs('[data-id = "modal-btn"]');
    this.$.turn = this.#qs('[data-id = "turn"]'); 

    this.$$.squares = this.#qsAll('[data-id = "square"]');
    
    //UI only event listeners
    this.$.menuBtn.addEventListener('click', event=> {
      this.#toggleMenu()
    });
  }

  //regist event listeners
  bindGameResetEvent(handler){
    this.$.resetBtn.addEventListener('click', handler);
    this.$.modalBtn.addEventListener('click', handler);
  }
  bindNewRoundEvent(handler){
    this.$.newRoundBtn.addEventListener("click",handler)
      
  }
  bindPlayerMoveEvent(handler){
    this.$$.squares.forEach((square) => {
      square.addEventListener('click', () => handler(square));
    });
  }

  //DOM helper method
  openModal(winner){
    const label = document.createElement('p');
    if(winner){
      label.innerText = `${winner.name} wins!`;
      this.$.modalText.replaceChildren(label);

      // Remove any previous winner classes
      this.$.modalContents.classList.remove("winner-1", "winner-2");

      // Add the correct class
      if (winner.id === 1) {
        this.$.modalContents.classList.add("winner-1");
      } else {
        this.$.modalContents.classList.add("winner-2");
      }
    }else{
      label.innerText = 'Tie!';
      this.$.modalText.replaceChildren(label);

      this.$.modalContents.classList.remove("winner-1", "winner-2");
      this.$.modalContents.classList.add("tie");
    }
    this.$.modal.classList.remove('hidden');
  }

  closeModal(){
    this.$.modal.classList.add('hidden');
  }

  clearBoard(){
    this.$$.squares.forEach(square => {
      square.replaceChildren();
    })
  }

  #toggleMenu(){
    this.$.menuItems.classList.toggle('hidden');
    this.$.menuBtn.classList.toggle('border');

    const icon = this.$.menuBtn.querySelector('i')
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }

  handlePlayerMove(squareEl, player){
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  setTurnIndicator(player){
    const icon = document.createElement('i');
    const label = document.createElement('p');
    
    icon.classList.add("fa-solid",player.colorClass, player.iconClass);

    label.classList.add(player.colorClass)
    label.innerText = `${player.name}, you're up! `;

    this.$.turn.replaceChildren(icon, label);
  }



 #qs(selector, parent){
    const el = parent 
      ? parent.querySelector(selector) 
      : document.querySelector(selector)

    if(!el) throw new Error('Could not find elements')
    return el;
  }

  #qsAll(selector){
    const elList = document.querySelectorAll(selector)

    if(!elList) throw new Error('Could not find elements')
    return elList;
  }

}
