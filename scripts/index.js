import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddPlace = document.querySelector('.popup_type_add');
const profileButton = document.querySelector('.profile__button-edit');
const newPlaceButton = document.querySelector('.profile__button-add');
const popupName = document.querySelector('.profile__name');
const popupAbout = document.querySelector('.profile__about');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = popupProfileEdit.querySelector('.popup__input_type_about');
const titleImageInput = popupAddPlace.querySelector('.popup__input_type_place-title');
const linkImageInput = popupAddPlace.querySelector('.popup__input_type_place-link');
const formEditProfile = document.querySelector('.popup__form_type_edit'); 
const formAddPlace = document.querySelector('.popup__form_type_add'); 
const cardsGallery = document.querySelector('.gallery__elements');
const popupOpenedImage = document.querySelector('.popup_type_image');
const popupImageTitle = popupOpenedImage.querySelector('.popup__image-title');
const popupImage = popupOpenedImage.querySelector('.popup__image');
const popupList = Array.from(document.querySelectorAll('.popup'));

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

const objectSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error-message_visible'
}


const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(objectSettings);


function handleCardClick(element) {
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupImageTitle.textContent = element.name;
  openPopup(popupOpenedImage);
}

function createCard(item) {
  const card = new Card(item, '.template_card', handleCardClick);
	const cardTemplate = card.generateCard();
  return cardTemplate;
}

initialCards.forEach((item) => {
  const cardTemplate = createCard(item);
	cardsGallery.append(cardTemplate);
});

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-active');
    closePopup(popupOpened);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_is-active');
  document.addEventListener('keyup', handleEscKey);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-active');
  document.removeEventListener('keyup', handleEscKey);
}

function fillInputProfile() {
  nameInput.value = popupName.textContent;
  aboutInput.value = popupAbout.textContent;
  openPopup(popupProfileEdit);
}

function handleFormEditSubmit (evt) {
    evt.preventDefault(); 
    popupName.textContent = nameInput.value;
    popupAbout.textContent = aboutInput.value;
    closePopup(popupProfileEdit);
}

function handleFormAddSubmit (evt) {
  evt.preventDefault(); 
  const newCardObject = {};
  newCardObject['name'] = titleImageInput.value;
  newCardObject['link'] = linkImageInput.value;
  const cardTemplate = createCard(newCardObject);
  cardsGallery.prepend(cardTemplate);
  closePopup(popupAddPlace);
  formAddPlace.reset();
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-active')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  }); 
});



formEditProfile.addEventListener('submit', handleFormEditSubmit);
formAddPlace.addEventListener('submit', handleFormAddSubmit);

profileButton.addEventListener('click', () => {
  fillInputProfile();
  formValidators['edit-form'].resetValidation();
});

newPlaceButton.addEventListener('click', () => {
  formAddPlace.reset();
  openPopup(popupAddPlace);
  formValidators['add-form'].resetValidation();
});





