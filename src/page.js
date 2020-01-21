import './page/ResultPopup.js';
import TranslationCoordinator from './page/TranslationCoordinator.js';
import { addMessageListener, Messages } from './Messages.js';

const coordinator = new TranslationCoordinator().init();

addMessageListener(window, Messages.TranslationReady, translation => {
  coordinator.showTranslation(translation);
});

document.addEventListener('selectionchange', event => {
  const selectedText = document.getSelection().toString();

  if (selectedText.length > 0) {
    coordinator.requestTranslation(selectedText);
  }
});