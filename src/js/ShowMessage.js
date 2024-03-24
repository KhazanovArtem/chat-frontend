import dateFormat from "dateformat";

export default class ShowMessage {
  constructor(container) {
    this.container = container
  }

  drawMessage(dataMsg) {
    const {from, msg, created} = dataMsg;

    const messageWRP = document.createElement('div');
    messageWRP.classList.add('messageWRP');

    if (from === 'You') {
      messageWRP.classList.add('currentUserMsg');
    } else {
      messageWRP.classList.add('otherUsersMsg');
    }

    const authorAndDateWrp = document.createElement('div');
    authorAndDateWrp.classList.add('authorAndDateWrp');

    if (from === 'You') {
      authorAndDateWrp.classList.add('currentUserMsg');
    }

    const authorEl = document.createElement('span');
    authorEl.textContent = `${from},`;
    authorAndDateWrp.appendChild(authorEl);

    const createdEl = document.createElement('span');
    createdEl.textContent = dateFormat(created, 'dd.mm.yy  HH:MM');

    authorAndDateWrp.appendChild(createdEl)

    messageWRP.appendChild(authorAndDateWrp)

    const messageEl = document.createElement('span');
    messageEl.classList.add('message');
    messageEl.textContent = msg;

    messageWRP.appendChild(messageEl)

    this.container.appendChild(messageWRP)
  }
}