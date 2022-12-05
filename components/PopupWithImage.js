import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popup.querySelector('.popup__picture');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  //перезаписываем метод open, используя старую функцию открытия картинки
  open(name, link) {
    super.open();
    this._picture.src = link;
    this._picture.alt = name;
    this._caption.textContent = name;
  }
}