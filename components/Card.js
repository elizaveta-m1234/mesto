export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._place = cardData.place;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCard() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document.
    querySelector(this._templateSelector).
    content.querySelector('.element').
    cloneNode(true);
        
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    this._element = this._getCard();

    this._cardImage = this._element.querySelector('.element__image');
    this._cardPlace = this._element.querySelector('.element__place');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDelete = this._element.querySelector('.element__delete');

    this._cardPlace.textContent = this._place;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;

    this._cardLike.addEventListener('click', () => this._likeCard());
    this._cardDelete.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._place, this._link));

    return this._element;
  }

  _likeCard() {
    this._element.querySelector('.element__like').
    classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}