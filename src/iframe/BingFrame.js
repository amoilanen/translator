import { addMessageListener, sendMessage, Messages } from '../Messages.js';

export default class BingFrame {

  constructor() {
  }

  get sourceElement() {
    return document.querySelector('#tta_input_ta');
  }

  get resultElement() {
    return document.querySelector('#tta_output_ta');
  }

  init() {
    addMessageListener(window, Messages.TranslationRequest, sourceText =>
      this.translate(sourceText)
    );
    return this;
  }

  translate(sourceText) {
    sourceText = sourceText.trim();
    this.sourceElement.value = sourceText;
    this.sourceElement.click();
    const checkForResultInterval = setInterval(() => {
      if (this.isTranslationReady(sourceText)) {
        sendMessage(window.parent, Messages.TranslationReady, this.getTranslationResult());
        clearInterval(checkForResultInterval);
      }
    }, 500);
  }

  isTranslationReady(sourceText) {
    const displayedSourceText = this.sourceElement.value.trim();
    const translation = this.resultElement.value;
    const isTranslationInProgress = translation.endsWith('...');

    return (displayedSourceText === sourceText) && !isTranslationInProgress;
  }

  getTranslationResult() {
    return this.resultElement.value.toLowerCase();
  }
}