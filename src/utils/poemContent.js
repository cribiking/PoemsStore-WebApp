const htmlTagPattern = /<[^>]+>/;

const escapeHtml = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const isHtmlContent = (value = '') => htmlTagPattern.test(value);

export const toEditorHtml = (value = '') => {
  if (!value) return '';
  if (isHtmlContent(value)) return value;
  return `<p>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`;
};

export const htmlToPlainText = (value = '') => {
  if (!value) return '';
  if (!isHtmlContent(value)) return value;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = value;
  return wrapper.innerText.replace(/\u00a0/g, ' ').trim();
};

export const isEditorContentEmpty = (value = '') => htmlToPlainText(value).trim() === '';