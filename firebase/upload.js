import { imageStorage } from './config.js'

export default function uploadImage(imgFile) {
  return new Promise((resolve, reject) => {
    const imgName = setImgFileName(imgFile);
    const uploadTask = generateUploadTask(imgName, imgFile);
    uploadToFirebase(uploadTask)
      .then((url) => {
        console.log("firebase 업로드 성공:", url);
        resolve();
      })
      .catch((err) => {
        console.error("firebase 에러:", err);
        reject();
      })
  })
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
  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', () => {
      // progress bar 생략
    }, (err) => {
      reject(err);
    }, async () => {
      try {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(url);
      } catch (err) {
        reject(err);
      }
    })
  })
}