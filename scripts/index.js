const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddPlace = document.querySelector('.popup_type_add');
const profileButton = document.querySelector('.profile__button-edit');
const newPlaceButton = document.querySelector('.profile__button-add');
const popupName = document.querySelector('.profile__name');
const popupAbout = document.querySelector('.profile__about');

// const popupTitleImage = document.querySelector('.gallery__title');
// const popupLinkImage = document.querySelector('.gallery__picture');

const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = popupProfileEdit.querySelector('.popup__input_type_about');
const titleImageInput = popupAddPlace.querySelector('.popup__input_type_place-title');
const linkImageInput = popupAddPlace.querySelector('.popup__input_type_place-link');
const formEditProfile = document.querySelector('.popup__form_type_edit'); 
const formAddPlace = document.querySelector('.popup__form_type_add'); 
const placeTitleInput = popupAddPlace.querySelector('.popup__input_type_place-title');
const placeLinkInput = popupAddPlace.querySelector('.popup__input_type_place-link');
const cardsGallery = document.querySelector('.gallery__elements');
const templateCard = document.querySelector('.template_card');
const btnClosePopupProfile = document.querySelector('.popup__close_edit');
const btnClosePopupPlace = document.querySelector('.popup__close_add');
const btnClosePopupImage = document.querySelector('.popup__close_image');
const popupOpenedImage = document.querySelector('.popup_type_image');
const popupImageTitle = popupOpenedImage.querySelector('.popup__image-title');
const popupImage = popupOpenedImage.querySelector('.popup__image');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function activeLike(evt) {
  evt.target.classList.toggle('like-is-active');
}

function appendNewCard(card) {
  cardsGallery.prepend(card);
}

function openPopupImage(element) {
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupImageTitle.textContent = element.name;
  openPopup(popupOpenedImage);
}

function getCard(item) {
  const cardTemplate = templateCard.content.cloneNode(true);
  const title = cardTemplate.querySelector('.gallery__title');
  title.textContent = item.name;
  const picture = cardTemplate.querySelector('.gallery__picture');
  picture.src = item.link;
  picture.alt = item.name;
  const buttonLike = cardTemplate.querySelector('.gallery__like');
  buttonLike.addEventListener('click', activeLike);
  const btnDeleteCard = cardTemplate.querySelector('.gallery__delete');
  btnDeleteCard.addEventListener('click', deleteCard);
  const openedImage = cardTemplate.querySelector('.gallery__link');
  openedImage.addEventListener('click', () => openPopupImage(item));
  return cardTemplate;
}

function render() {
  initialCards.map((item) => {
    const newCard = getCard(item); 
    appendNewCard(newCard);
  });   
}

render();

function deleteCard(evt) {
  const currentCard = evt.target.closest('.gallery__element');
  currentCard.remove();
}


const openPopup = (popup) => {
  popup.classList.add('popup_is-active');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-active');
}

function fillInputProfile() {
  nameInput.value = popupName.textContent;
  aboutInput.value = popupAbout.textContent;
  openPopup(popupProfileEdit);
}

function submitFormEditHandler (evt) {
    evt.preventDefault(); 
    popupName.textContent = nameInput.value;
    popupAbout.textContent = aboutInput.value;
    closePopup(popupProfileEdit);
}

function submitFormAddHandler (evt) {
  evt.preventDefault(); 
  const newCardObject = {};
  newCardObject['name'] = titleImageInput.value;
  newCardObject['link'] = linkImageInput.value;
  const newCard = getCard(newCardObject);
  appendNewCard(newCard);
  closePopup(popupAddPlace);
  formAddPlace.reset();
}

formEditProfile.addEventListener('submit', submitFormEditHandler);
formAddPlace.addEventListener('submit', submitFormAddHandler);

profileButton.addEventListener('click', fillInputProfile);

btnClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});

newPlaceButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

btnClosePopupPlace.addEventListener('click', () => {
  closePopup(popupAddPlace);
});

btnClosePopupImage.addEventListener('click', () => {
  closePopup(popupOpenedImage);
});


