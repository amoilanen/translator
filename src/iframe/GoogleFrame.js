import { addMessageListener, sendMessage, Messages } from '../Messages.js';

function constructFrameUrl(text) {
  return `https://translate.google.com/#view=home&op=translate&sl=fi&tl=en&text=${text}`;
}

export default class GoogleFrame {

  constructor() {
  }

  get sourceElement() {
    return document.querySelector("#source");
  }

  get resultElement() {
    return document.querySelector('.tlid-translation.translation');
  }

  init() {
    addMessageListener(window, Messages.TranslationRequest, sourceText =>
      this.translate(sourceText)
    );
    return this;
  }

  translate(sourceText) {
    window.location.href = constructFrameUrl(sourceText);
    sourceText = sourceText.trim();
    const checkForResultInterval = setInterval(() => {
      if (this.isTranslationReady(sourceText)) {
        sendMessage(window.parent, Messages.TranslationReady, this.getTranslationResult());
        clearInterval(checkForResultInterval);
      }
    }, 500);
  }

  isTranslationReady(sourceText) {
    const displayedSourceText = this.sourceElement.value.trim();
    const translation = this.resultElement.innerText;
    const isTranslationInProgress = translation.endsWith('...');

    return (displayedSourceText === sourceText) && !isTranslationInProgress;
  }

  getTranslationResult() {
    return this.resultElement.innerText;
  }
}