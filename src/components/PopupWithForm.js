import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, callbackSubmitForm) {
    super(selector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = document.querySelector(selector).querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._button = this.popup.querySelector('.popup__button');
    this._defaultTextButton = this._button.textContent;
  }

  _getInputValues() {
    const inputElement = {};
    this._inputList.forEach(itemInput => {
      inputElement[itemInput.name] = itemInput.value;
    });
    return inputElement;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const item = this._getInputValues();
      this._callbackSubmitForm(item);
    })
    super.setEventListeners()
  }

  close() {
    this._popupForm.reset();
    super.close()
  }

  requestLoading(loading, buttonText) {
    if (loading) {
      this._button.textContent = buttonText;
    } else {
      this._button.textContent = this._defaultTextButton;
    }
  }
  
  
}