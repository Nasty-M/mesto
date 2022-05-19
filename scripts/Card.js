import { openPopupImage } from "./index.js";

export class Card {
  constructor(cardObj, templateSelector) {
    this._cardObj = cardObj;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__element')
      .cloneNode(true)

    return cardTemplate;
  }

  _activeLike(evt) {
    evt.target.classList.toggle('like-is-active');
  }

  _deleteCard(evt) {
    const currentCard = evt.target.closest('.gallery__element');
    currentCard.remove();
  }

  _setEventListeners(card) {
    const buttonLike = card.querySelector('.gallery__like');
    const btnDeleteCard = card.querySelector('.gallery__delete');
    const openedImage = card.querySelector('.gallery__picture')
    buttonLike.addEventListener('click', this._activeLike);  
    btnDeleteCard.addEventListener('click', this._deleteCard);  
    openedImage.addEventListener('click', () => openPopupImage(this._cardObj));
  }

  generateCard() {
    const cardElement = this._getTemplate();
    
    cardElement.querySelector('.gallery__picture').src = this._cardObj.link;
    cardElement.querySelector('.gallery__picture').alt = this._cardObj.name;
    cardElement.querySelector('.gallery__title').textContent = this._cardObj.name;
    this._setEventListeners(cardElement);
   
    return cardElement;
  }
}