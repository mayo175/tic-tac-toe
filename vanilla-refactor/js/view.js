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
  }
  bindNewRoundEvent(handler){
    this.$.newRoundBtn.addEventListener("click",handler)
      
  }
  bindPlayerMoveEvent(handler){
    this.$$.squares.forEach((square) => {
      square.addEventListener('click', handler);
    });
  }

  //DOM helper method
  #toggleMenu(){
    this.$.menuItems.classList.toggle('hidden');
    this.$.menuBtn.classList.toggle('border');

    const icon = this.$.menuBtn.querySelector('i')
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  }

  #setTurnIndicator(player){
    const icon = document.createElement('i');
    const label = document.createElement('p');

    icon.classList.add(player === 1 ? 'yellow' : 'turquoise');
    label.classList.add(player === 1 ? 'yellow' : 'turquoise')
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
