function scrollToTop() {
  window.scrollTo(0,0);
}

function scrollToElement(element) {
  element.scrollIntoView();
}

export {
  scrollToTop,
  scrollToElement
}