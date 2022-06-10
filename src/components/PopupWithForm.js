import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm) {
    super(selector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = document.querySelector(selector).querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputElement = {};
    this._inputList.forEach(itemInput => {
      inputElement[itemInput.name] = itemInput.value;
    });
    return inputElement;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', () => {
      const item = this._getInputValues();
      this._callbackSubmitForm(item);
    })
    super.setEventListeners()
  }

  close() {
    this._popupForm.reset();
    super.close()
  }
}