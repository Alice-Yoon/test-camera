const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const snapBtn = document.querySelector('#snapBtn');
const rotateBtn = document.querySelector('#rotateBtn');
const outline = document.querySelector('#outline');
const imgSection = document.querySelector('.prev-img-section');
const submitBtn = document.querySelector('#submitBtn');

const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    facingMode: 'environment' // facingMode: 'environment'(후면카메라) / 'user'(정면카메라)
  }
})

////////////////////////////////////
///// 유저 카메라 접근 & video로 송출 ////
////////////////////////////////////
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  userMedia.then(stream => {
    // 1. camera: show stream
    video.srcObject = stream;
    // 2. outline: set size & show 
    const stream_settings = stream.getVideoTracks()[0].getSettings();
    showOutline(stream_settings.width, stream_settings.height);
  })
  .catch(err => {
    console.log(`${err.name} : ${err.message}`)
  })
}

//////////////////
///// 사진찍기 /////
//////////////////
snapBtn.addEventListener('click', showPhoto);

function showPhoto() {
  imgSection.classList.add('flex');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function hidePhoto() {
  imgSection.classList.remove('flex');
}

//////////////////////
///// 사진 Submit /////
//////////////////////
submitBtn.addEventListener('click', submitPhoto);

function submitPhoto() {
  const imageFile = dataURLtoFile(canvas.toDataURL('image/png'), 'imageTest.png');
  console.log("image::", imageFile);
  hidePhoto();
}

///////////////////////////
///// outline 화면에 출력 ////
///////////////////////////
function showOutline(width, height) {
  if(width && height) {
    outline.style.display = 'block';
    outline.style.width = `300px`;
    outline.style.height = `300px`;
    // outline.style.width = `${width/2}px`;
    // outline.style.height = `${height/1.5}px`;
  }
}

//////////////////////////
///// rotate outline /////
//////////////////////////
let degreeNum = 0;
const degree = ['0', '90', '180', '270'];
rotateBtn.addEventListener('click', () => {
  degreeNum += 1;
  if(degreeNum > 3) {
    degreeNum = 0;
  }
  outline.style.transform = `rotate(${degree[degreeNum]}deg)`;
  rotateBtn.innerText = `${degree[degreeNum]}°`;
})

////////////////////////////////////////////
///// 이미지파일: dataUrl -> File 객체 변환 /////
////////////////////////////////////////////
function dataURLtoFile (dataurl, fileName) {
  let arr = dataurl.split(','),
     mime = arr[0].match(/:(.*?);/)[1],
     bstr = atob(arr[1]),
     n = bstr.length,
     u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, {type:mime});
}

