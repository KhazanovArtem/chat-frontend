export default class ShowUser {
    constructor(container) {
      this.container = container
    }
  
    drawUser(user) {
      this.user = user;
      const {name} = this.user;
      const userWRP = document.createElement('div');
      userWRP.classList.add('userWRP');
  
      const userImg = document.createElement('div');
      userImg.style.background = 'lightgray';
      userImg.classList.add('userImg');
  
      userWRP.appendChild(userImg);
  
      const userName = document.createElement('span');
      userName.textContent = name;
      if (name === 'You') {
        userName.classList.add('currentUser')
      }
      userName.classList.add('userName');
  
      userWRP.appendChild(userName);
      this.container.appendChild(userWRP)
    }
  
  }