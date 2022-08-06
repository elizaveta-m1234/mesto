const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-btn',
  inactiveButtonClass: 'submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
} 
/*Параметр settings явлется формальным параметром функций и используется при их объявлении. Объект validationConfig является фактическим параметром функции enableValidation,
и передается непосредственно при вызове ей и остальным функциям, которые вызывает она. Все селекторы и классы в коде берутся из объекта. Все значения селекторов и классов
прописаны в соответствии с разметкой страницы в index.html. Наставник посоветовал переименовать объект, больше проблем не нашел.*/

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(settings.errorClass)
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

const disableButton = (buttonElement, settings) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const enableButton = (buttonElement, settings) => {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, settings);
  } else {
    enableButton(buttonElement, settings);
  }
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

const hidePopupErrors = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    })
  })
}

const enableSubmitButton = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    enableButton(buttonElement, settings);
  });
}

const disableSubmitButton = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    disableButton(buttonElement, settings);
  });
}

enableValidation(validationConfig);