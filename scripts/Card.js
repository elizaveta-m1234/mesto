export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
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

      const cardImage = this._element.querySelector('.element__image');
      const cardPlace = this._element.querySelector('.element__place');
      const cardLike = this._element.querySelector('.element__like');
      const cardDelete = this._element.querySelector('.element__delete');

      cardPlace.textContent = this._name;
      cardImage.src = this._link;
      cardImage.alt = this.name;

      cardLike.addEventListener('click', this._likeCard);
      cardDelete.addEventListener('click', this._deleteCard);
      cardImage.addEventListener('click', this._handleCardClick(this._name, this._link));

      return this._element;
    }

    _likeCard(evt) {
      evt.target.classList.toggle('element__like_active');
    }

    _deleteCard(evt) {
      evt.target.closest('.element').remove();
    }
}