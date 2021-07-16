const notifySection = document.querySelector('#notify');

function notify(notification) {
  notifySection.style.display = 'block';
  notifySection.innerText = notification;
  setTimeout(() => {
    removeNoti();
  }, 1500);
}

function removeNoti() {
  notifySection.style.display = 'none';
  notifySection.innerText = '';
}

export {
  notify,
  removeNoti
}