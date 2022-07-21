import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImageTitle = this.popup.querySelector('.popup__image-title');
    this._popupImage = this.popup.querySelector('.popup__image');
  }

  open(card) {
    this._popupImage.src = card.link;
    this._popupImage.alt = card.name;
    this._popupImageTitle.textContent = card.name;
    super.open();
  }
    
}