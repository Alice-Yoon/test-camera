export default function toggleLoader(show) {
  if(show) {
    document.querySelector('#loading').classList.add('flex');
  } else {
    document.querySelector('#loading').classList.remove('flex');
  }
}