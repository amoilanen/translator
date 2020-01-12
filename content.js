(async () => {
  /*const script = document.createElement('script');
  script.src = 'node_modules/@webcomponents/custom-elements/custom-elements.min.js';
  document.querySelector('head').appendChild(script);
  */
  const customElementsPolyfill = chrome.runtime.getURL('node_modules/@webcomponents/custom-elements/custom-elements.min.js');
  await import(customElementsPolyfill);

  const contentRoot = chrome.runtime.getURL('src/translate.js');
  await import(contentRoot);
})();