import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) { //принимает колбэк сабмита формы
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    //формы и инпуты
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.submit-btn')
  }

  //собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input)  => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //наставник посоветовал сделать метод, вставляющий данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input)  => {
      input.value = data[input.name];
    });
  }

  //Перезаписывает родительский метод setEventListeners, добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  //Перезаписывает родительский метод close, сбрасывает форму
  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
      //console.log('Сохранение...') -- не успеваю увидеть изменение кнопки, пусть будет для теста
    } else {
      this._submitBtn.textContent = 'Сохранить'
    }
  }
}