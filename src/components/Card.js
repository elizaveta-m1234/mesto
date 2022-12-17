export class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardData = cardData;
    this._place = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._id = cardData.id;
    this._userId = cardData.userId;
    this._ownerId = cardData.ownerId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this._id));
    this._cardDelete.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._place, this._link));
  }

  _likeCard() {
    this._cardLike.classList.add('element__like_active');
  }

  _removeLike() {
    this._cardLike.classList.remove('element__like_active');
  }

  isLiked() {
    const userLikedCard = this._likes.find(user => user._id === this._userId);

    return userLikedCard;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeCard();
    } else {
      this._removeLike();
    }
  }

  generateCard() {
    this._element = this._getCard();

    this._cardImage = this._element.querySelector('.element__image');
    this._cardPlace = this._element.querySelector('.element__place');
    this._cardLike = this._element.querySelector('.element__like');
    this._cardDelete = this._element.querySelector('.element__delete');
    this._likeCountElement = this._element.querySelector('.element__likes-number');

    this._cardPlace.textContent = this._place;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;

    this._setEventListeners();
    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardDelete.classList.add('element__delete_invisible');
      this._cardDelete = null;
    }

    return this._element;
  }
}