export class Card {
  constructor(cardObj, templateSelector, handleCardClick) {
    this._cardObj = cardObj;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.gallery__element').cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._buttonLike = this._cardTemplate.querySelector('.gallery__like');
    this._btnDeleteCard = this._cardTemplate.querySelector('.gallery__delete');
    this._cardImage = this._cardTemplate.querySelector('.gallery__picture');
    this._cardTitle = this._cardTemplate.querySelector('.gallery__title');
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('like-is-active');
  }

  _deleteCard(evt) {
    const currentCard = evt.target.closest('.gallery__element');
    currentCard.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', this._toggleLike);  
    this._btnDeleteCard.addEventListener('click', this._deleteCard);  
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardObj);
    });
  }

   generateCard() {
    this._cardImage.src = this._cardObj.link;
    this._cardImage.alt = this._cardObj.name;
    this._cardTitle.textContent = this._cardObj.name;
    this._setEventListeners();
   
    return this._cardTemplate;
  }
}