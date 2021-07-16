import uploadImage from '../firebase/upload.js';
import dataURLtoFile from '../utils/dataURLtoFile.js';
import toggleLoader from '../utils/toggleLoader.js';
import { notify } from '../utils/notify.js';
import { scrollToTop, scrollToElement } from '../utils/screenScroll.js';
const imgSection = document.querySelector('.prev-img-section');
const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

//////////////////
///// 사진촬영 /////
//////////////////
function snapPhoto() {
  setCanvasSize();
  drawImage();
  showImgSection();
  scrollToElement(canvas);
}

function setCanvasSize() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}

function drawImage() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function showImgSection() {
  imgSection.classList.add('flex');
}

//////////////////
///// 사진제출 /////
//////////////////
function submitPhoto() {
  scrollToTop();
  toggleLoader(true);
  const imageFile = dataURLtoFile(canvas.toDataURL('image/png'), 'imageTest.png');
  uploadImage(imageFile)
    .then(() => {
      hidePhoto();
      toggleLoader(false);
      notify('이미지 업로드 완료!');
    })
    .catch(() => {
      toggleLoader(false);
      notify('firebase 이미지 업로드 실패하였습니다.');
    })
}

function hidePhoto() {
  imgSection.classList.remove('flex');
}

export {
  snapPhoto,
  submitPhoto
}