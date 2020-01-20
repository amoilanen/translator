import './translate/ResultPopup.js';
import TranslationCoordinator from './translate/TranslationCoordinator.js';

console.log("Ran main content script!");

const manager = new TranslationCoordinator().init();

window.addEventListener('message', event => {
  try {
    const message = JSON.parse(event.data);
    if (message.type === 'translation:ready') {
      const translation = message.payload;
      manager.showTranslation(translation);
    }
  } catch (error) {
    console.log(error);
  }
}, false);

document.addEventListener('selectionchange', event => {
  const selectedText = document.getSelection().toString();

  //console.log('Selected text:');
  //console.log(selectedText);

  if (selectedText.length > 0) {
    manager.requestTranslation(selectedText);
    const iframe = document.querySelector('iframe[name=translation-frame]');

    const message = {
      type: 'translation:request',
      payload: selectedText
    };
    console.log(`Asking to translate "${selectedText}"`);
    iframe.contentWindow.postMessage(JSON.stringify(message), '*');
  }
});