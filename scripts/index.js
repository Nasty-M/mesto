const editProfileButton = document.querySelector('.profile__button-edit');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
const popupName = document.querySelector('.profile__name');
const popupAbout = document.querySelector('.profile__about');

let nameInput = modalWindow.querySelector('.popup__input_type_name');
let aboutInput = modalWindow.querySelector('.popup__input_type_about');
let formElement = document.querySelector('.popup__form'); 

function openModalWindow() {
  modalWindow.classList.add('popup_is-active');
}

function closeModalWindow() {
  modalWindow.classList.remove('popup_is-active');
}

function fillInput() {
  nameInput.value = popupName.textContent;
  aboutInput.value = popupAbout.textContent;
  openModalWindow();
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    popupName.textContent = nameInput.value;
    popupAbout.textContent = aboutInput.value;
    closeModalWindow();
}

formElement.addEventListener('submit', formSubmitHandler);
editProfileButton.addEventListener('click', fillInput);
modalCloseBtn.addEventListener('click', closeModalWindow);


