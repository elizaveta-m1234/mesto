export class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._occupation = document.querySelector(occupationSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      occupation: this._occupation.textContent
    }
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._occupation.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}