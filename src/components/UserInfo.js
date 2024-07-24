export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._displayName = document.querySelector(nameSelector);
    this._displayJob = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._displayName.textContent,
      description: this._displayJob.textContent,
    };
  }
  setUserInfo(data) {
    this._displayName.textContent = data.title;
    this._displayJob.textContent = data.description;
    return;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
