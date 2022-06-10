export class UserInfo { 
  constructor(selectorName, selectorAbout) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
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
 }