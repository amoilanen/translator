import Frame from './Frame.js';

function constructFrameUrl(text, sourceLanguage, targetLanguage) {
  return `https://translate.google.com/#view=home&op=translate&sl=${sourceLanguage}&tl=${targetLanguage}&text=${text}`;
}

export default class GoogleFrame  extends Frame {

  get sourceElement() {
    return document.querySelector("#source");
  }

  get resultElement() {
    return document.querySelector('.tlid-translation.translation');
  }

  startTranslation(sourceText, sourceLanguage, targetLanguage) {
    window.location.href = constructFrameUrl(sourceText, sourceLanguage, targetLanguage);
  }

  isTranslationInProgress() {
    const translation = this.resultElement.innerText;
    return translation.endsWith('...');
  }

  getTranslationResult() {
    return 'google: ' + this.resultElement.innerText;
  }
}