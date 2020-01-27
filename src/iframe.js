import Storage from './util/Storage.js';
import GoogleFrame from './iframe/GoogleFrame.js';
import BingFrame from './iframe/BingFrame.js';

(async function() {
  const frames = {
    'google': GoogleFrame,
    'bing': BingFrame
  };
  const translationEngine = await Storage.get('translation.engine');
  const Frame = frames[translationEngine];

  new Frame().init();
})();
