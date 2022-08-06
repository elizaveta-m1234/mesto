/*Начальные карточки*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  popup: '.popup',
  popupOpened: '.popup_is-opened',
  /*Селекторы для попапа Profile*/
  popupEdit: '.popup_type_profile',
  closeEdit: '.popup__close_profile',
  edit: '.profile__edit-button',
  save: '.popup__save',
  nameInput: '.popup__input_type_name',
  jobInput: '.popup__input_type_occupation',
  profile: '.profile',
  pName: '.profile__name',
  pJob: '.profile__occupation',
  formEdit: '.popup__form_edit',
  /*Селекторы для попапа Entry*/
  popupAdd: '.popup_type_entry',
  closeAdd: '.popup__close_entry',
  add: '.profile__add-button',
  formAdd: '.popup__form_create',
  placeInput: '.popup__input_type_place',
  linkInput: '.popup__input_type_link',
  create: '.popup__create',
  list: '.elements__list',
  template: '.card',
  listItem: '.element',
  cardImage: '.element__image',
  cardPlace: '.element__place',
  delete: '.element__delete',
  like: '.element__like',
  /*Селекторы для попапа Picture*/
  picturePopup: '.popup_type_picture',
  picture: '.popup__picture',
  caption: '.popup__caption',
  closePicture: '.popup__close_picture'
}

const popupElements = document.querySelectorAll(selectors.popup);
/*Константы попапа Profile*/
const popupEditElement = document.querySelector(selectors.popupEdit);
const popupEditCloseButtonElement = popupEditElement.querySelector(selectors.closeEdit);
const profileElement = document.querySelector(selectors.profile);
const popupEditButtonElement = profileElement.querySelector(selectors.edit);
const popupSaveButtonElement = popupEditElement.querySelector(selectors.save);
const nameInput = popupEditElement.querySelector(selectors.nameInput);
const jobInput = popupEditElement.querySelector(selectors.jobInput);
const profileNameElement = profileElement.querySelector(selectors.pName);
const profileJobElement = profileElement.querySelector(selectors.pJob);
const formEditElement = popupEditElement.querySelector(selectors.formEdit);
/*Константы попапа Entry*/
const popupAddElement = document.querySelector(selectors.popupAdd);
const popupAddCloseButtonElement = popupAddElement.querySelector(selectors.closeAdd);
const popupAddButtonElement = profileElement.querySelector(selectors.add);
const formAddElement = popupAddElement.querySelector(selectors.formAdd);
const placeInput = popupAddElement.querySelector(selectors.placeInput);
const linkInput = popupAddElement.querySelector(selectors.linkInput);
const popupCreateButtonElement = popupAddElement.querySelector(selectors.create);
const listElement = document.querySelector(selectors.list);
const cardTemplateElement = document.querySelector(selectors.template).content;
/*Константы попапа Picture*/
const popupPictureElement = document.querySelector(selectors.picturePopup);
const popupFullPictureElement = popupPictureElement.querySelector(selectors.picture);
const popupCaptionElement = popupPictureElement.querySelector(selectors.caption);
const popupPictureCloseButtonElement = popupPictureElement.querySelector(selectors.closePicture);

/*Общая функция открытия попапов*/
function openPopup(pop) {
  pop.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnPressKey); /*происходит всплытие*/
}

/*Общая функция закрытия попапов*/
function closePopup(pop) {
  pop.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnPressKey); 
}

/*Закрытие попапов по клавише*/
function closePopupOnPressKey(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(selectors.popupOpened));
  }
}

/*Закрытие попапов по щелчку по оверлею*/
popupElements.forEach(item =>
  item.addEventListener('mousedown', event => {
    if (event.target === event.currentTarget) {
      closePopup(item);
    }
  })
);

/*Интерактивность попапа Profile*/
popupEditButtonElement.addEventListener('click', () => {
  openPopup(popupEditElement);
  hidePopupErrors(obj);
  enableSubmitButton(obj);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

popupEditCloseButtonElement.addEventListener('click', () => closePopup(popupEditElement));

function editProfileContent(evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup(popupEditElement);
}

formEditElement.addEventListener('submit', editProfileContent);

/*Интерактивность попапа Entry*/
popupAddButtonElement.addEventListener('click', () => {
  openPopup(popupAddElement);
  formAddElement.reset();
  hidePopupErrors(obj);
  disableSubmitButton(obj);
});

popupAddCloseButtonElement.addEventListener('click', () => closePopup(popupAddElement));

/*Создаем карточку*/
function createCard(element) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardImageElement = cardElement.querySelector(selectors.cardImage);
  cardImageElement.src = element.link;
  cardImageElement.alt = element.name;
  cardElement.querySelector(selectors.cardPlace).textContent = element.name;

  /*Интерактивность попапа Picture*/
  cardImageElement.addEventListener('click', function() {
    openPopup(popupPictureElement);
    popupFullPictureElement.src = element.link;
    popupFullPictureElement.alt = element.name;
    popupCaptionElement.textContent = element.name;
  });
  /*Интерактивность попапа Picture - конец*/

  /*Лайк*/
  cardElement.querySelector(selectors.like).addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  })

  /*Удаление*/
  cardElement.querySelector(selectors.delete).addEventListener('click', function(evt) {
    evt.target.closest(selectors.listItem).remove();
  });

  return(cardElement);
};

popupPictureCloseButtonElement.addEventListener('click', () => closePopup (popupPictureElement));

/*Функция вставки карточки*/
function renderCard(cardElement) {
  listElement.prepend(createCard(cardElement));
};

/*Создаем начальные 6 карточек*/
function createInitialCards() {
    initialCards.forEach(function (cardElement) {
        renderCard(cardElement);
    });
};

createInitialCards();

/*Добавление новой карточки*/
function addNewCard(evt) {
  evt.preventDefault();
  const cardName = placeInput.value;
  const cardLink = linkInput.value;
  renderCard({name: cardName, link: cardLink});
  closePopup(popupAddElement);
}

formAddElement.addEventListener('submit', addNewCard);