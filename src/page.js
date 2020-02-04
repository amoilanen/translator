import Storage from './util/Storage.js';
import './page/ResultPopup.js';
import TranslationOverlay from './page/TranslationOverlay.js';


(async function() {
  await Storage.set('translation.engine', 'google');
  const overlay = await new TranslationOverlay().init();

  document.addEventListener('selectionchange', event => {
    const selectedText = document.getSelection().toString();

    if (selectedText.length > 0) {
      overlay.requestTranslation(selectedText);
    }
  });
})();