import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import { validationConfig } from "../utils/constants.js";
import { selectors } from "../utils/constants.js";
import './index.css';

/*Константы попапа Profile*/
const popupEditElement = document.querySelector(selectors.popupEdit);
const profileElement = document.querySelector(selectors.profile);
const popupEditButtonElement = profileElement.querySelector(selectors.edit);
const nameInput = popupEditElement.querySelector(selectors.nameInput);
const jobInput = popupEditElement.querySelector(selectors.jobInput);
/*Константы попапа Entry*/
const popupAddElement = document.querySelector(selectors.popupAdd);
const popupAddButtonElement = profileElement.querySelector(selectors.add);
/*Константы попапа Avatar*/
const popupAvatarElement = document.querySelector(selectors.popupAvatar);
const popupAvatarButtonElement = document.querySelector(selectors.avatarBtn)

const editFormValidator = new FormValidator(validationConfig, popupEditElement);
const addFormValidator = new FormValidator(validationConfig, popupAddElement);
const avatarFormValidator = new FormValidator(validationConfig, popupAvatarElement);

let userId

//принимаем имя и информацию
api.getProfile()
  .then(res => {
    userProfile.setUserInfo(res)

    userId = res._id
  })

//принимаем карточки
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(res => {
      const card = createCard({
        place: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      section.addItem(card)
    });
  })

/*Функция создания карточки (переделываем после рефакторинга и теперь с учетом апи)*/
const createCard = (item) => {
  const card = new Card(item, '.card', (place, link) => {
    //handleCardClick "ушла" в PopupWithImage, вытаскиваем метод из экземпляра класса
    popupPicture.open(place, link);
  },
    (_id) => {
      popupDelete.open();
      popupDelete.changeSubmitHandler(() => {
        api.deleteCard(_id)
          .then(res => {
            card.deleteCard()
            popupDelete.close()
          })
      });
    },
    (_id) => {
      if (card.isLiked()) {
        api.deleteLike(_id)
          .then(res => {
            card.setLikes(res.likes)
          })
      } else {
        api.addLike(_id)
          .then(res => {
            card.setLikes(res.likes)
          })
      }
    },
  );
  return card.generateCard();
}

/*Создаем секцию и карточки, см. подсказку от ст. студента в Слаке*/
// и обновим функцию передаваемую в конструктор
const section = new Section({
  items: [],
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  }
}, '.elements__list');

// создаем попап с большой картинкой
const popupPicture = new PopupWithImage('.popup_type_picture');
popupPicture.setEventListeners();

//создаем попап для добавления карточки
const popupEntry = new PopupWithForm('.popup_type_entry', (cardData) => {
  popupEntry.renderLoading(true)
  api.addCard(cardData.place, cardData.link)
    .then(res => {
      const card = createCard({
        link: res.link,
        place: res.name,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      });
    section.addItem(card);
    popupEntry.close();
    addFormValidator.disableButton();
    })
    .finally(() => popupEntry.renderLoading(false))
});

popupEntry.setEventListeners();

//попап подтверждения удаления
const popupDelete = new PopupWithConfirm('.popup_type_delete');

popupDelete.setEventListeners();

//создаем профиль
const userProfile = new UserInfo({
  nameSelector: '.profile__name',
  occupationSelector: '.profile__occupation',
  avatarSelector: '.profile__avatar'
})

//создаем попап для изменения профиля
const popupProfile = new PopupWithForm('.popup_type_profile', (inputValues) => {
  popupProfile.renderLoading(true)
  api.editProfile(inputValues.name, inputValues.about)
    .then(res => {
      userProfile.setUserInfo(inputValues);
      popupProfile.close();
    })
  .finally(() => popupProfile.renderLoading(false))  
})

popupProfile.setEventListeners();

//попап смены аватара
const popupAvatar = new PopupWithForm('.popup_type_avatar', ({ link }) => {
  popupAvatar.renderLoading(true)
  api.editAvatar(link)
    .then(res => {
      userProfile.setUserInfo(res)
    })
    .finally(() => popupAvatar.renderLoading(false)) 
})

popupAvatar.setEventListeners();

//интерактивность попапа с аватаром
popupAvatarButtonElement.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
})

/*Интерактивность попапа Profile (меняем с учетом класса UserInfo)*/
popupEditButtonElement.addEventListener('click', () => {
  editFormValidator.resetValidation();
  popupProfile.open();
  const info = userProfile.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.occupation;
});

/*Интерактивность попапа Entry (меняем с учетом класса UserInfo)*/
popupAddButtonElement.addEventListener('click', () => {
  // где-то здесь был ресет формы, но он ушел в подкласс попапа
  addFormValidator.resetValidation();
  popupEntry.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();