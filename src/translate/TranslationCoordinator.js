function constructFrameUrl(word) {
  return `https://translate.google.com/#view=home&op=translate&sl=fi&tl=en&text=${word}`;
}

function createdPopup() {
  const resultPopup = document.createElement('ts-result-popup');
  document.body.appendChild(resultPopup);
  return resultPopup;
}

function createIFrame() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('name', 'translation-frame')
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

export default class TranslationCoordinator {

  constructor() {
  }

  init() {
    this.resultPopup = createdPopup();
    this.iframe = createIFrame();
    return this;
  }

  showTranslation(translation) {
    console.log(`Received translation = ${translation}`);
    this.resultPopup.show(translation);
    setTimeout(() => {
      this.resultPopup.hide();
    }, 2000);
  }

  requestTranslation(text) {
    this.iframe.setAttribute('src', constructFrameUrl(text));
  }
}