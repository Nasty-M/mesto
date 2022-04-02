const editProfileButton = document.querySelector('.profile__button-edit');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');

function openModalWindow() {
  modalWindow.classList.add('popup_is-active');
}

editProfileButton.addEventListener('click', fillInput);

function closeModalWindow() {
  modalWindow.classList.remove('popup_is-active');
}

modalCloseBtn.addEventListener('click', closeModalWindow);

const myForm = document.querySelector('.popup__form');

const popupName = document.querySelector('.profile__name');
const popupAbout = document.querySelector('.profile__about');

let nameInput = modalWindow.querySelector('.popup__input_type_name');
let aboutInput = modalWindow.querySelector('.popup__input_type_about');

function fillInput() {
  nameInput.value = popupName.textContent;
  aboutInput.value = popupAbout.textContent;
  openModalWindow();
}

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    popupName.textContent = nameInput.value;
    popupAbout.textContent = aboutInput.value;
    closeModalWindow();
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


