import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleDeleteClick) {
    super(popupSelector);
    this._handleDeleteClick = handleDeleteClick;
    //формы и инпуты
    this._form = this._popup.querySelector('.popup__form');
  }

  //инпутов нет

  changeSubmitHandler(newSubmitHandler) {
    this._handleDeleteClick = newSubmitHandler;
  }

  //Перезаписывает родительский метод setEventListeners, добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteClick();
    })
  }
}