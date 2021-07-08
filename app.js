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
      max: 640
    },
    height: {
      max: 480
    },
    // width: 350,
    // height: 196,
    // width: 640,
    // height: 480,
    facingMode: 'environment'
  }
})

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  userMedia.then(stream => {
    console.log("카메라 등장!")
    video.srcObject = stream;

    const stream_settings = stream.getVideoTracks()[0].getSettings();
    const stream_width = stream_settings.width;
    const stream_height = stream_settings.height;
    console.log("camera size-width??", stream_width)
    console.log("camera size-height??", stream_height)

    setOutlineSize(stream_width, stream_height);
    setCanvasSize(stream_width, stream_height);
  })
  .catch(err => {
    console.log(`${err.name} : ${err.message}`)
  })
}

function setOutlineSize(width, height) {
  if(width && height) {
    outline.style.display = 'block';
    outline.style.width = `${width/2}px`;
    outline.style.height = `${height/1.5}px`;
  }
}

function setCanvasSize(width, height) {
  canvas.style.display = 'block';
  canvas.width = width;
  canvas.height = height;
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

