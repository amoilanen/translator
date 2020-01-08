
function getSelectionCoordinates() {
  const selection = document.getSelection();

  //TODO: Handle the case when nothing is selected on the page
  const firstSelectionRange = selection.getRangeAt(0);
  return firstSelectionRange.getBoundingClientRect();
}

export default class ResultPopup {

  constructor() {
  }

  init() {
    this.translationPopup = document.createElement('span');
    this.translationPopup.style.height = '20px';
    this.translationPopup.style.backgroundColor = '#badcfe';
    this.translationPopup.style.position = 'fixed';
    this.translationPopup.innerText = '';
    this.translationPopup.style.display = 'none';
    document.body.appendChild(this.translationPopup);
    return this;
  }

  show(translation) {
    const selectionBoundingClientRect = getSelectionCoordinates();
    const popupPosition = {
      top: selectionBoundingClientRect.top + selectionBoundingClientRect.height,
      left: selectionBoundingClientRect.left
    };

    this.translationPopup.style.display = '';
    this.translationPopup.style.left = `${popupPosition.left}px`;
    this.translationPopup.style.top = `${popupPosition.top}px`;
    this.translationPopup.innerText = translation;
  }

  hide() {
    this.translationPopup.style.display = 'none;';
  }
}