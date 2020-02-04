import Frame from './Frame.js';

const languageCodes = {
  'English': 'en',
  'Dutch': 'nl',
  'Finnish': 'fi'
};

export default class BingFrame extends Frame {

  get sourceElement() {
    return document.querySelector('#tta_input_ta');
  }

  get resultElement() {
    return document.querySelector('#tta_output_ta');
  }

  get sourceLanguageElement() {
    return document.querySelector('#tta_srcsl');
  }

  get targetLanguageElement() {
    return document.querySelector('#tta_tgtsl');
  }

  startTranslation(sourceText, sourceLanguage, targetLanguage) {
    this.sourceLanguageElement.value = languageCodes[sourceLanguage];
    this.targetLanguageElement.value = languageCodes[targetLanguage];
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