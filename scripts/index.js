const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddPlace = document.querySelector('.popup_type_add');
const editProfileButton = document.querySelector('.profile__button-edit');
const addNewPlaceButton = document.querySelector('.profile__button-add');
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
const closePopupProfileBtn = document.querySelector('.popup__close_edit');
const closePopupPlaceBtn = document.querySelector('.popup__close_add');
const closePopupImageBtn = document.querySelector('.popup__close_image');
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
  const getCardTemplate = templateCard.content.cloneNode(true);
  const title = getCardTemplate.querySelector('.gallery__title');
  title.textContent = item.name;
  const picture = getCardTemplate.querySelector('.gallery__picture');
  picture.src = item.link;
  const buttonLike = getCardTemplate.querySelector('.gallery__like');
  buttonLike.addEventListener('click', activeLike);
  const deleteButtonCard = getCardTemplate.querySelector('.gallery__delete');
  deleteButtonCard.addEventListener('click', deleteCard);
  const openImage = getCardTemplate.querySelector('.gallery__link');
  openImage.addEventListener('click', () => openPopupImage(item));
  return getCardTemplate;
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
  formAddPlace.reset();
  closePopup(popupAddPlace);
}

formEditProfile.addEventListener('submit', submitFormEditHandler);
formAddPlace.addEventListener('submit', submitFormAddHandler);

editProfileButton.addEventListener('click', fillInputProfile);

closePopupProfileBtn.addEventListener('click', () => {
  closePopup(popupProfileEdit);
});

addNewPlaceButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

closePopupPlaceBtn.addEventListener('click', () => {
  closePopup(popupAddPlace);
});

closePopupImageBtn.addEventListener('click', () => {
  closePopup(popupOpenedImage);
});


