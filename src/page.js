import './page/ResultPopup.js';
import TranslationOverlay from './page/TranslationOverlay.js';

const overlay = new TranslationOverlay().init();

document.addEventListener('selectionchange', event => {
  const selectedText = document.getSelection().toString();

  if (selectedText.length > 0) {
    overlay.requestTranslation(selectedText);
  }
});