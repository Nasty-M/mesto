import { Popup } from "./Popup.js";

const popupOpenedImage = document.querySelector('.popup_type_image');
const popupImageTitle = popupOpenedImage.querySelector('.popup__image-title');
const popupImage = popupOpenedImage.querySelector('.popup__image');

export class PopupWithImage extends Popup {
  
  open(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupImageTitle.textContent = card.name;
    super.open();
  }
    
}