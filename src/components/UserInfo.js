export class UserInfo { 
  constructor(selectorName, selectorAbout, selectorAvatar) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._avatar = document.querySelector(selectorAvatar);
    this.userId = '';
  } 

  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.about = this._about.textContent;
    return userData;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setId(data) {
    this.userId = data._id;
  }
 }