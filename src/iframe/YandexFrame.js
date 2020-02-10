import { sendMessage, Messages } from '../Messages.js';
import Frame from './Frame.js';

function constructFrameUrl(text, sourceLanguage, targetLanguage) {
  return `https://translate.yandex.com/?lang=${sourceLanguage}-${targetLanguage}&text=${text}`;
}

function getCurrentState() {
  const langParamKeyValue = window.location.search.split('&')[0];
  const langParamValue = langParamKeyValue.split('=')[1];
  if (langParamValue) {
    const [sourceLanguage, targetLanguage] = langParamValue.split('-');

    return {
      sourceLanguage,
      targetLanguage
    };
  } else {
    return {};
  }
}

function simulateEnter(element) {
  const event = document.createEvent('Events');
  event.initEvent('keypress', true, true);
  event.code = 'Enter';

  element.dispatchEvent(event);
}

export default class YandexFrame  extends Frame {

    constructor() {
      super();
      this.sourceLanguage = '';
      this.targetLanguage = '';
      this.translationResultBefore = '';
    }

    init() {
      super.init();
      const translationResult = this.getTranslationResult();
      if (translationResult != '') {
        sendMessage(window.parent, Messages.TranslationReady, translationResult);
      }
    }

    get sourceElement() {
      return document.querySelector('.fakearea.textinput');
    }
  
    get resultElement() {
      return document.querySelector('#translation');
    }
  
    startTranslation(sourceText, sourceLanguage, targetLanguage) {
      const {
        sourceLanguage: currentSourceLanguage,
        targetLanguage: currentTargetLanguage
      } = getCurrentState();
      if (currentSourceLanguage != sourceLanguage || currentTargetLanguage != targetLanguage) {
        window.location.href = constructFrameUrl(sourceText, sourceLanguage, targetLanguage);
      } else {
        this.translationResultBefore = this.resultElement.textContent;
        this.sourceElement.innerText = sourceText;
        simulateEnter(this.sourceElement);
      }
    }

    isTranslationInProgress() {
      const translation = this.resultElement.textContent;
      return translation === this.translationResultBefore;
    }
  
    getTranslationResult() {
      return this.resultElement.textContent;
    }
  }