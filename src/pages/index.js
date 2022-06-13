import './index.css'; 

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, objectSettings } from "../utils/constants.js";

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__button-edit');
const newPlaceButton = document.querySelector('.profile__button-add');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = popupProfileEdit.querySelector('.popup__input_type_about');
const formAddPlace = document.querySelector('.popup__form_type_add'); 

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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, '.gallery__elements');

cardList.renderItems();

const popupAddPlace = new PopupWithForm(
  '.popup_type_add',
  (item) => {
    cardList.renderer(item);
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





