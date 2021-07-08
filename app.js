const video = document.querySelector('#camera');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const snapBtn = document.querySelector('#snapBtn');
const rotateBtn = document.querySelector('#rotateBtn');
const outline = document.querySelector('#outline');

const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    // width: {
    //   min: 192,
    //   max: 640
    // },
    // height: {
    //   min: 144,
    //   max: 480
    // },
    // width: 640,
    // height: 480,
    facingMode: 'environment' // facingMode: 'environment'(후면카메라) / 'user'(정면카메라)
  }
})


let stream_width;
let stream_height;

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  userMedia.then(stream => {
    console.log("카메라 등장!")
    video.srcObject = stream;

    // get stream size + set outline & canvas size
    const stream_settings = stream.getVideoTracks()[0].getSettings();
    stream_width = stream_settings.width;
    stream_height = stream_settings.height;
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
  if(width && height) {
    canvas.style.display = 'block';
    canvas.width = width;
    canvas.height = height;
  }
}

snapBtn.addEventListener('click', () => {
  /// 1. 찍은 사진 미리보기
  context.drawImage(video, 0, 0, stream_width, stream_height);
  /// 2.imageFile 추출
  const imageFile = dataURLtoFile(canvas.toDataURL('image/png'), 'imageTest.png');
  console.log("image::", imageFile)
})

let degreeNum = 0;
const degree = ['0', '90', '180', '270'];
rotateBtn.addEventListener('click', () => {
  degreeNum += 1;
  if(degreeNum > 3) {
    degreeNum = 0;
  }
  outline.style.transform = `rotate(${degree[degreeNum]}deg)`;
  rotateBtn.innerText = `${degree[degreeNum]}도`;
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

