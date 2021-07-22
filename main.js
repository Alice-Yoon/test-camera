import { cameraOn, rotateOutline } from './camera/camera.js';
import { snapPhoto, retakePhoto, submitPhoto } from './photo/photo.js';

const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    TEST //
    width: 1080,
    height: 768,
    /////////
    facingMode: 'environment' // facingMode: 'environment'(후면카메라) / 'user'(정면카메라)
  }
})

///// 유저 카메라 접근 & video로 송출 ////
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  cameraOn(userMedia);
}

addEventListeners();

function addEventListeners() {
  document.querySelector('#snapBtn').addEventListener('click', snapPhoto); // 사진촬영
  document.querySelector('#retakeBtn').addEventListener('click', retakePhoto); // 재촬영
  document.querySelector('#submitBtn').addEventListener('click', submitPhoto); // 사진제출
  document.querySelector('#rotateBtn').addEventListener('click', rotateOutline); // outline 모양변경
}

