import { addMessageListener, sendMessage, Messages } from '../Messages.js';

export default class Frame {

  get sourceElement() {
    throw new Error('`sourceElement` should be implemented by a subclass');
  }

  get resultElement() {
    throw new Error('`resultElement` should be implemented by a subclass');
  }

  startTranslation() {
    throw new Error('`startTranslation` should be implemented by a subclass');
  }

  isTranslationInProgress() {
    throw new Error('`isTranslationInProgress` should be implemented by a subclass');
  }

  getTranslationResult() {
    throw new Error('`getTranslationResult` should be implemented by a subclass');
  }

  init() {
    addMessageListener(window, Messages.TranslationRequest, ({text: sourceText, sourceLanguage, targetLanguage}) =>
      this.translate(sourceText, sourceLanguage, targetLanguage)
    );
    return this;
  }

  translate(sourceText, sourceLanguage, targetLanguage) {
    sourceText = sourceText.trim();
    this.startTranslation(sourceText, sourceLanguage, targetLanguage);
    const checkForResultInterval = setInterval(() => {
      if (this.isTranslationReady(sourceText)) {
        sendMessage(window.parent, Messages.TranslationReady, this.getTranslationResult());
        clearInterval(checkForResultInterval);
      }
    }, 500);
  }

  isTranslationReady(sourceText) {
    let displayedSourceText = this.sourceElement.value || this.sourceElement.innerText;
    displayedSourceText = displayedSourceText.trim();
    return (displayedSourceText === sourceText) && !this.isTranslationInProgress();
  }
}