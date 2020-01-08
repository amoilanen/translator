const script = document.createElement('script');
script.setAttribute('type', 'module');
script.setAttribute('src', chrome.extension.getURL('src/translate.js'));

const head = document.head || document.querySelector('head') || document.documentElement;
head.insertBefore(script, head.lastChild);