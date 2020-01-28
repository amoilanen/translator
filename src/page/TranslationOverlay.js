import Storage from '../util/Storage.js';
import { addMessageListener, sendMessage, Messages } from '../Messages.js';

const translationUrls = {
  'google': 'https://translate.google.com',
  'bing': 'https://www.bing.com/translator',
  'yandex': 'https://translate.yandex.com'
};

function createdPopup() {
  const resultPopup = document.createElement('ts-result-popup');
  document.body.appendChild(resultPopup);
  return resultPopup;
}

async function createIFrame() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('name', 'translation-frame');

  const translationEngine = await Storage.get('translation.engine');
  const translationUrl = translationUrls[translationEngine];

  iframe.src = translationUrl;
  iframe.style.display = 'none';

  iframe.style.display = 'inline-block';
  iframe.style.position = 'fixed';
  iframe.style.top = 0;
  iframe.style.width = '800px';
  iframe.style.height = '400px';

  document.body.appendChild(iframe);
  return iframe;
}

export default class TranslationOverlay {

  constructor() {
  }

  async init() {
    this.resultPopup = createdPopup();
    this.iframe = await createIFrame();
    addMessageListener(window, Messages.TranslationReady, translation => {
      this.showTranslation(translation);
    });
    return this;
  }

  showTranslation(translation) {
    console.log(`Received translation = ${translation}`);
    this.resultPopup.show(translation);
    setTimeout(() => {
      this.resultPopup.hide();
    }, 2000);
  }

  requestTranslation(text) {
    sendMessage(this.iframe.contentWindow, Messages.TranslationRequest, text);
  }
}