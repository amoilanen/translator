(async () => {
  const customElementsPolyfill = chrome.runtime.getURL('node_modules/@webcomponents/custom-elements/custom-elements.min.js');
  await import(customElementsPolyfill);

  const contentRoot = chrome.runtime.getURL('src/page.js');
  await import(contentRoot);
})();