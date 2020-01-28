// Adapted from https://github.com/guilryder/chrome-extensions/tree/master/xframe_ignore

const without = (arr, propertyAccessor, withoutProperties) =>
  arr.filter(element =>
    withoutProperties.indexOf(propertyAccessor(element)) < 0
  );

const headerNamesToIgnore = [
  'x-frame-options',
  'X-Frame-Options'
];

const urls = [
  'https://translate.google.com/*',
  'https://bing.com/*',
  'https://translate.yandex.com/*'
];

const options = [
  'blocking', 'responseHeaders'
];

chrome.webRequest.onHeadersReceived.addListener(
  details =>
    ({
      responseHeaders: without(
        details.responseHeaders,
        _ => _.name,
        headerNamesToIgnore
      )
    })
  , {
    urls
  },
  options
);