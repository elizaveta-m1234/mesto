export const selectors = {
  /*Селекторы для попапа Profile*/
  popupEdit: '.popup_type_profile',
  edit: '.profile__edit-button',
  nameInput: '.popup__input_type_name',
  jobInput: '.popup__input_type_occupation',
  profile: '.profile',
  /*Селекторы для попапа Entry*/
  popupAdd: '.popup_type_entry',
  add: '.profile__add-button',
  /*Селекторы для попапа Avatar*/
  popupAvatar: '.popup_type_avatar',
  avatarBtn: '.profile__avatar-btn'
}

/*Валидация*/
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.submit-btn',
  inactiveButtonClass: 'submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}