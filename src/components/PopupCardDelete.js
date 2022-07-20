import { Popup } from "./Popup";

export class PopupCardDelete extends Popup {
  constructor(selector, {callbackFunction}) {
    super(selector);
    this._callbackFunction = callbackFunction;
    this._buttonSubmit = this.popup.querySelector('.popup__button');
    this.currentCard = '';
    this.cardId = 0;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._callbackFunction(this);
    });
  }

  requestLoading(loading, buttonText) {
    if (loading) {
      this._buttonSubmit.textContent = buttonText;
    } else {
      this._buttonSubmit.textContent = this._defaultTextButton;
    }
  }
}