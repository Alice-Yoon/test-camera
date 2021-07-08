const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const snapBtn = document.querySelector('#snapBtn');
const rotateBtn = document.querySelector('#rotateBtn');
const outline = document.querySelector('#outline');

const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: {
      min: 250,
      max: 640
    },
    height: {
      min: 196,
      max: 480
    },
    // width: 350,
    // height: 196,
    facingMode: 'environment'
  }
})

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  userMedia.then(stream => {
    console.log("카메라 등장!")
    video.srcObject = stream;
  })
  .catch(err => {
    console.log(`${err.name} : ${err.message}`)
  })
}

snapBtn.addEventListener('click', () => {
  /// 1. 찍은 사진 미리보기
  context.drawImage(video, 0, 0, 640, 480);
  /// 2.imageFile 추출
  const imageFile = dataURLtoFile(canvas.toDataURL('image/png'), 'imageTest.png');
  console.log("image::", imageFile)
})

rotateBtn.addEventListener('click', () => {
  outline.style.transform = 'rotate(90deg)';
  rotateBtn.innerText = '90도';
  console.log("rotateBtn!!")
})


// 이미지파일: dataUrl -> File 객체 변환
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

