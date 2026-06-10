export default class View {
  $ = {};

  constructor() {
    this.$.menu = document.querySelector('[data-id = "menu"]');
    this.$.menuItems = document.querySelector('[data-id = "menu-items"]');
    this.$.resetBtn = document.querySelector('[data-id = "resetBtn"]');
    this.$.newRoundBtn = document.querySelector('[data-id = "newRoundBtn"]');
    this.$.squares = document.querySelectorAll('[data-id = "square"]');
    this.$.modal = document.querySelector('[data-id = "modal"]');
    this.$.modalContents = document.querySelector(
      '[data-id = "modal-contents"]'
    );
    this.$.modalText = document.querySelector('[data-id = "modal-text"]');
    this.$.modalBtn = document.querySelector('[data-id = "modal-btn"]');
    this.$.turn = document.querySelector('[data-id = "turn"]');
  }
}
