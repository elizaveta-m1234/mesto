export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);  
  }

  // метод открытия общий
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //метод закрытия общий
  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose); 
  }

  //закрытие через клавишу
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //закрытие через клик (нужно совместить оверлей и кнопку)
  setEventListeners() {
    this._popup.addEventListener('mousedown', event => {
      if ((event.target === event.currentTarget) || event.target.classList.contains('popup__close'))
        {
          this.close();
      }
    })
  }

}