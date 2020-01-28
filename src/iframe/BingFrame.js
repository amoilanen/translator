import Frame from './Frame.js';

export default class BingFrame extends Frame {

  get sourceElement() {
    return document.querySelector('#tta_input_ta');
  }

  get resultElement() {
    return document.querySelector('#tta_output_ta');
  }

  startTranslation(sourceText) {
    this.sourceElement.value = sourceText;
    this.sourceElement.click();
  }

  isTranslationInProgress() {
    const translation = this.resultElement.value;
    return translation.endsWith('...');
  }

  getTranslationResult() {
    return 'bing: ' + this.resultElement.value.toLowerCase();
  }
}