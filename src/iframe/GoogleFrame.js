import Frame from './Frame.js';

function constructFrameUrl(text) {
  return `https://translate.google.com/#view=home&op=translate&sl=fi&tl=en&text=${text}`;
}

export default class GoogleFrame  extends Frame {

  get sourceElement() {
    return document.querySelector("#source");
  }

  get resultElement() {
    return document.querySelector('.tlid-translation.translation');
  }

  startTranslation(sourceText) {
    window.location.href = constructFrameUrl(sourceText);
  }

  isTranslationInProgress() {
    const translation = this.resultElement.innerText;
    return translation.endsWith('...');
  }

  getTranslationResult() {
    return 'google: ' + this.resultElement.innerText;
  }
}