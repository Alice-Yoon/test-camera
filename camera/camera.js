import { notify } from '../utils/notify.js';
const video = document.querySelector('#camera');
const cameraSection = document.querySelector('.camera-section');
const rotateBtn = document.querySelector('#rotateBtn');
const outlines = document.querySelectorAll('.outline');


//////////////////////////
///// turn on camera /////
//////////////////////////
function cameraOn(userMedia) {
  userMedia
    .then(stream => {
      setCameraScreen(stream);
      showCameraSection();
    })
    .catch(err => {
      notify('카메라 접근을 실패하였습니다.');
      console.log(`${err.name} : ${err.message}`)
    })
}

function setCameraScreen(stream) {
  video.srcObject = stream;
}

function showCameraSection() {
  cameraSection.classList.add('flex');
}

//////////////////////////
///// rotate outline /////
//////////////////////////
let degreeNum = 0;
const degree = ['0', '90', '180', '270'];

function rotateOutline() {
  degreeNum += 1;
  if(degreeNum > 3) {
    degreeNum = 0;
  }
  outlines.forEach(outline => outline.style.transform = `rotate(${degree[degreeNum]}deg)`);
  rotateBtn.innerText = `${degree[degreeNum]}°`;
}

export {
  cameraOn,
  rotateOutline
}