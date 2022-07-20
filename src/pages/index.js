import './index.css'; 

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, objectSettings } from "../utils/constants.js";
import { Api } from '../components/Api.js';
import { PopupCardDelete } from '../components/PopupCardDelete';

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__button-edit');
const newPlaceButton = document.querySelector('.profile__button-add');
const avatarButton = document.querySelector('.profile__overlay');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const aboutInput = popupProfileEdit.querySelector('.popup__input_type_about');
const formAddPlace = document.querySelector('.popup__form_type_add'); 

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '70c3bcab-31df-4e85-91b9-8f01679d44b6',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
.then((data) => {
  userInfo.setUserInfo(data);
  userInfo.setAvatar(data);   
  userInfo.setId(data);   
})
.catch((err) => {
  console.log(`Ошибка ${err}. Запрос не выполнен`);
});

api.getInitialCards()
.then((data) => {
  cardList._items = data;
  cardList.renderItems();
})
.catch((err) => {
  console.log(`Ошибка ${err}. Запрос не выполнен`);
});

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
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

function openPopupDelete(card) {
  popupCardDelete.currentCard = card.btnDeleteCard.closest('.gallery__element');
  popupCardDelete.open();
  popupCardDelete.cardId = card.getId();
}

function createCard(item) {
  const card = new Card(item, '.template_card', handleCardClick, openPopupDelete, handleLike, userInfo.userId);
	const cardTemplate = card.generateCard();
  return cardTemplate;
}

const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, '.gallery__elements');

const popupAddPlace = new PopupWithForm(
  '.popup_type_add',
  (item) => {
    popupAddPlace.requestLoading(true, 'Сохранение...');
    api.addNewCard(item)
      .then((data) => {
        cardList.renderer(data);
        popupAddPlace.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Запрос не выполнен`);
      })
      .finally(() => {
        popupAddPlace.requestLoading(false, '');
      });
  }
)
popupAddPlace.setEventListeners();

const popupUpdAvatar = new PopupWithForm(
  '.popup_type_avatar',
  (item) => {
    popupUpdAvatar.requestLoading(true, 'Сохранение...');
    api.updAvatar(item)
      .then((data) => {
        userInfo.setAvatar({avatar: data.avatar});
        popupUpdAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Запрос не выполнен`);
      })
      .finally(() => {
        popupUpdAvatar.requestLoading(false, '');
      });
  }
)
popupUpdAvatar.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit',
  (item) => {
    popupEditProfile.requestLoading(true, 'Сохранение...');
    api.editUserInfo(item)
      .then((data) => {
        userInfo.setUserInfo({name: data.name, about: data.about});
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Запрос не выполнен`);
      })
      .finally(() => {
        popupEditProfile.requestLoading(false, '');
      });
  }
)
popupEditProfile.setEventListeners();

const popupCardDelete = new PopupCardDelete(
  '.popup__delete-card',
  {callbackFunction: (popup) => {
    popup.requestLoading(true, 'Удаление...');
    api.deleteCard(popup.cardId)
    .then(() => {
      popup.currentCard.remove(); 
      popup.close();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
    .finally(() => {
      popup.requestLoading(false, '');
    })
  }}
)
popupCardDelete.setEventListeners();

const handleLike = (card) => {
  api.toggleLike(card.getId(), card.isLiked())
  .then((response) => {
    card.updInfoLikes(response);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}. Запрос не выполнен`);
  });
}

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

avatarButton.addEventListener('click', () => {
  popupUpdAvatar.open();
  formValidators['change-avatar'].resetValidation();
});





