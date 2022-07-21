export class Card {
  constructor(cardObj, templateSelector, handleCardClick, openPopupDelete, handleLike, userId) {
    this._cardObj = cardObj;
    this._templateSelector = templateSelector;
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.gallery__element').cloneNode(true);
    this._handleCardClick = handleCardClick;
    this._buttonLike = this._cardTemplate.querySelector('.gallery__like');
    this.btnDeleteCard = this._cardTemplate.querySelector('.gallery__delete');
    this._cardImage = this._cardTemplate.querySelector('.gallery__picture');
    this._cardTitle = this._cardTemplate.querySelector('.gallery__title');
    this._counterLikes = this._cardTemplate.querySelector('.gallery__like-counter');
    this._openPopupDelete = openPopupDelete;
    this._userId = userId; 
    this._handleLike = handleLike;            
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('like-is-active');
  }

  deleteCard() {
    this._cardTemplate.remove();
    this._cardTemplate = null;
  }

  getId() {
    return this._cardObj._id;
  }

  isLiked() {
    return this._buttonLike.classList.contains('like-is-active');
  }

  setEventListeners() {
    this._buttonLike.addEventListener('click', () => {this._handleLike(this)});  
    if (this._userId === this._cardObj.owner._id) {
      this.btnDeleteCard.classList.add('gallery__delete_visible');
      this.btnDeleteCard.addEventListener('click', () => {this._openPopupDelete(this)}); 
    }
      this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardObj);
    });
  }

  generateCard() {
    this._cardImage.src = this._cardObj.link;
    this._cardImage.alt = this._cardObj.name;
    this._cardTitle.textContent = this._cardObj.name;
    this._counterLikes.textContent = this._cardObj.likes.length;
    this._cardObj.likes.forEach((item) => {
      if (this._userId === item._id) {
        this._buttonLike.classList.add('like-is-active')
      }
    })
    this.setEventListeners();

    return this._cardTemplate;
  }

  updInfoLikes(response) {
    this._toggleLike();
    this._counterLikes.textContent = response.likes.length;
  }
}