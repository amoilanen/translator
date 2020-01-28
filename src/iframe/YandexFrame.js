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
      return document.querySelector('#fakeArea');
    }
  
    get resultElement() {
      return document.querySelector('#translation');
    }
  
    startTranslation(sourceText) {
      this.translationResultBefore = this.getTranslationResult();
      document.querySelector('#fakeArea').value = sourceText;
      simulateEnter(tdocument.querySelector('#fakeArea'));
    }
  
    isTranslationInProgress() {
      const translation = this.resultElement.textContent;
      console.log(`isTranslationInProgress = ${translation !== this.translationResultBefore}`);
      console.log(`before = "${this.translationResultBefore}"`);
      console.log(`translation = "${translation}"`);
      return translation !== this.translationResultBefore;
    }
  
    getTranslationResult() {
      return this.resultElement.textContent;
    }
  }