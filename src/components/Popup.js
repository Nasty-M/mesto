export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.selector = selector;
  }
  
  open() {
    this.popup.classList.add('popup_is-active');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_is-active');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-active')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    }); 
  }
}