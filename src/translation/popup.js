
export function showTranslation(translation) {
  const selection = document.getSelection();
  const firstSelectionRange = selection.getRangeAt(0);
  const selectionBoundingClientRect = firstSelectionRange.getBoundingClientRect();
  const popupPosition = {
    top: selectionBoundingClientRect.top + selectionBoundingClientRect.height,
    left: selectionBoundingClientRect.left
  };

  const translationPopup = document.createElement('span');
  translationPopup.style.display = 'inline-block;';
  translationPopup.style.height = '20px';
  translationPopup.style.backgroundColor = '#badcfe';
  translationPopup.style.position = 'fixed';
  translationPopup.style.left = `${popupPosition.left}px`;
  translationPopup.style.top = `${popupPosition.top}px`;
  translationPopup.innerText = translation;
  document.body.appendChild(translationPopup);

  setTimeout(() => {
    document.body.removeChild(translationPopup);
  }, 2000);
}