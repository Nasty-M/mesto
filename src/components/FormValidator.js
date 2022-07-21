export class FormValidator {
  constructor(objSettings, formElement) {
    this._objSettings = objSettings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._objSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._objSettings.submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._objSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._objSettings.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._objSettings.inputErrorClass);
    errorElement.classList.remove(this._objSettings.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {  
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); 
    });
  }

  _toggleButtonState = () => {
    if ( this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._objSettings.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._objSettings.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  };

 enableValidation = () => {
    /* this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });*/
    this._setEventListeners();
  }; 

}
