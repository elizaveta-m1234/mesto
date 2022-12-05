import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

/*Начальные карточки*/
const initialCards = [
  {
    place: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    place: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    place: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    place: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    place: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    place: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  /*Селекторы для попапа Profile*/
  popupEdit: '.popup_type_profile',
  edit: '.profile__edit-button',
  nameInput: '.popup__input_type_name',
  jobInput: '.popup__input_type_occupation',
  profile: '.profile',
  /*Селекторы для попапа Entry*/
  popupAdd: '.popup_type_entry',
  add: '.profile__add-button',
  /*Селекторы для попапа Picture*/
}

/*Константы попапа Profile*/
const popupEditElement = document.querySelector(selectors.popupEdit);
const profileElement = document.querySelector(selectors.profile);
const popupEditButtonElement = profileElement.querySelector(selectors.edit);
const nameInput = popupEditElement.querySelector(selectors.nameInput);
const jobInput = popupEditElement.querySelector(selectors.jobInput);
/*Константы попапа Entry*/
const popupAddElement = document.querySelector(selectors.popupAdd);
const popupAddButtonElement = profileElement.querySelector(selectors.add);
/*Константы попапа Picture*/

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
  const card = new Card(item, '.card', (place, link) => {
    //handleCardClick "ушла" в PopupWithImage, вытаскиваем метод из экземпляра класса
    popupPicture.open(place, link);
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