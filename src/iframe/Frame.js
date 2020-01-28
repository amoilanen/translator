import { addMessageListener, sendMessage, Messages } from '../Messages.js';

export default class Frame {

  get sourceElement() {
    throw new Error('`sourceElement` should be implemented by a subclass');
  }

  get resultElement() {
    throw new Error('`resultElement` should be implemented by a subclass');
  }

  startTranslation(sourceText) {
    throw new Error('`startTranslation` should be implemented by a subclass');
  }

  isTranslationInProgress() {
    throw new Error('`isTranslationInProgress` should be implemented by a subclass');
  }

  getTranslationResult() {
    throw new Error('`getTranslationResult` should be implemented by a subclass');
  }

  init() {
    addMessageListener(window, Messages.TranslationRequest, sourceText =>
      this.translate(sourceText)
    );
    return this;
  }

  translate(sourceText) {
    sourceText = sourceText.trim();
    this.startTranslation(sourceText);
    const checkForResultInterval = setInterval(() => {
      if (this.isTranslationReady(sourceText)) {
        sendMessage(window.parent, Messages.TranslationReady, this.getTranslationResult());
        clearInterval(checkForResultInterval);
      }
    }, 500);
  }

  isTranslationReady(sourceText) {
    const displayedSourceText = this.sourceElement.value.trim();
    return (displayedSourceText === sourceText) && !this.isTranslationInProgress();
  }
}