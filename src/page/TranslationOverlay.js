import { addMessageListener, sendMessage, Messages } from '../Messages.js';

function createdPopup() {
  const resultPopup = document.createElement('ts-result-popup');
  document.body.appendChild(resultPopup);
  return resultPopup;
}

function createIFrame() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('name', 'translation-frame');
  //iframe.src = "https://translate.google.com";
  iframe.src = "https://www.bing.com/translator";
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  return iframe;
}

export default class TranslationOverlay {

  constructor() {
  }

  init() {
    this.resultPopup = createdPopup();
    this.iframe = createIFrame();
    addMessageListener(window, Messages.TranslationReady, translation => {
      this.showTranslation(translation);
    });
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
    sendMessage(this.iframe.contentWindow, Messages.TranslationRequest, text);
  }
}