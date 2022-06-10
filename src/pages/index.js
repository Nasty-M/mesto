import './index.css'; 

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__button-edit');
const newPlaceButton = document.querySelector('.profile__button-add');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = popupProfileEdit.querySelector('.popup__input_type_about');
const formAddPlace = document.querySelector('.popup__form_type_add'); 
const cardsGallery = document.querySelector('.gallery__elements');

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

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();


function handleCardClick(element) {
  popupWithImage.open(element);
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

const renderCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    renderCards.addItem(card);
  }
}, '.gallery__elements');

renderCards.renderItems();

const popupAddPlace = new PopupWithForm(
  '.popup_type_add',
  (item) => {
    renderCards.renderer(item);
    popupAddPlace.close();
  }
)
popupAddPlace.setEventListeners();


const userInfo = new UserInfo('.profile__name', '.profile__about');

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit',
  (item) => {
    userInfo.setUserInfo(item);
    popupEditProfile.close();
  }
)
popupEditProfile.setEventListeners();

profileButton.addEventListener('click', () => {
  const previousUserInfo = userInfo.getUserInfo();
  nameInput.value = previousUserInfo.name;
  aboutInput.value = previousUserInfo.about;
  popupEditProfile.open();
  formValidators['edit-form'].resetValidation();
});

newPlaceButton.addEventListener('click', () => {
  formAddPlace.reset();
  popupAddPlace.open();
  formValidators['add-form'].resetValidation();
});





