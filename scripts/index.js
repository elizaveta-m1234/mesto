const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save');
let nameInput = popupElement.querySelector('.popup__input_type_name');
let jobInput = popupElement.querySelector('.popup__input_type_occupation');
const profileElement = document.querySelector('.profile');
let profileNameElement = profileElement.querySelector('.profile__name');
let profileJobElement = profileElement.querySelector('.profile__occupation');
let formElement = popupElement.querySelector('.popup__form');


const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileJobElement.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);

popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileNameElement.textContent = nameInput.value;
    profileJobElement.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 