(async () => {
    const contentRoot = chrome.runtime.getURL('src/iframe.js');
    await import(contentRoot);
  })();