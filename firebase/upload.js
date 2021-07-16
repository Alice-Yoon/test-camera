import { imageStorage } from './config.js'

export default function uploadImage(imgFile) {
  const imgName = setImgFileName(imgFile);
  const uploadTask = generateUploadTask(imgName, imgFile);
  uploadToFirebase(uploadTask);
}

const storageFolder = 'dental_boda';

function setImgFileName(imgFile) {
  const todayMilli = Date.now();
  const fileExt = imgFile.name.split('.').pop();
  return `${todayMilli}.${fileExt}`
}

function generateUploadTask(imgName, imgFile) {
  return imageStorage.ref().child(`${storageFolder}/${imgName}`).put(imgFile);
}

function uploadToFirebase(uploadTask) {
  uploadTask.on('state_changed', (snap) => {
    // let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
    // this.progress = percentage 
  }, (err) => {
    console.error("firebase err::", err);
  }, async () => {
    try {
      const url = await uploadTask.snapshot.ref.getDownloadURL();
      console.log("url::", url);
    } catch (error) {
      console.error(`url을 가져오는데 실패했습니다. error: ${error}`)
    }
  })
}