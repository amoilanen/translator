(async () => {
  const src = chrome.runtime.getURL('src/translate.js');
  await import(src);
})();