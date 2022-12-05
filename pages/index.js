import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

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

/*Валидация*/
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-btn',
  inactiveButtonClass: 'submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editFormValidator = new FormValidator(validationConfig, popupEditElement);
const addFormValidator = new FormValidator(validationConfig, popupAddElement);

/*Функция создания карточки (переделываем после рефакторинга)*/
const createCard = (item) => {
  const card = new Card(item, '.card', (name, link) => {
    //handleCardClick "ушла" в PopupWithImage, вытаскиваем метод из экземпляра класса
    popupPicture.open(name, link);
  });
  return card.generateCard();
}

/*Создаем секцию и карточки, см. подсказку от ст. студента в Слаке*/
// и обновим функцию передаваемую в конструктор
const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  }
}, '.elements__list');

/*Создаем начальные 6 карточек*/
section.renderItems();

// создаем попап с большой картинкой
const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

//создаем попап для добавления карточки
const popupEntry = new PopupWithForm('.popup_type_entry', (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
  popupEntry.close();
  addFormValidator.disableButton();
});

popupEntry.setEventListeners();

//создаем профиль
const userProfile = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation'
})

//создаем попап для изменения профиля
const popupProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
  userProfile.setUserInfo(inputValues);
  popupProfile.close();
})

popupProfile.setEventListeners();

/*Интерактивность попапа Profile (меняем с учетом класса UserInfo)*/
popupEditButtonElement.addEventListener('click', () => {
  popupProfile.open();
  nameInput.value = userProfile.getUserInfo().name;
  jobInput.value = userProfile.getUserInfo().occupation;
  editFormValidator.resetValidation();
});

/*Интерактивность попапа Entry (меняем с учетом класса UserInfo)*/
popupAddButtonElement.addEventListener('click', () => {
  popupEntry.open();
// где-то здесь был ресет формы, но он ушел в подкласс попапа
  addFormValidator.resetValidation();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();