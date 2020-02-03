import Frame from './Frame.js';

function simulateEnter(element) {
  const event = document.createEvent('Events');
  event.initEvent('keypress', true, true);
  event.code = 'Enter';

  element.dispatchEvent(event);
}

export default class YandexFrame  extends Frame {

    constructor() {
      super();
      this.translationResultBefore = '';
    }

    get sourceElement() {
      return document.querySelector('.fakearea.textinput');
    }
  
    get resultElement() {
      return document.querySelector('#translation');
    }
  
    startTranslation(sourceText) {
      this.translationResultBefore = this.resultElement.textContent;
      this.sourceElement.innerText = sourceText;
      simulateEnter(this.sourceElement);
    }

    isTranslationInProgress() {
      const translation = this.resultElement.textContent;
      return translation === this.translationResultBefore;
    }
  
    getTranslationResult() {
      return this.resultElement.textContent;
    }
  }