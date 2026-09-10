(function () {
  'use strict';
  const config = window.EUROPA_SIGNATURE_CONFIG;
  const api = window.EuropaSignature;
  const signature = document.getElementById('signature');
  const status = document.getElementById('status');
  const localBase = new URL('./', location.href).href;
  function publicBase(value) {
    if (!value) return '';
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      if (url.protocol !== 'https:' || url.username || url.password || /^(localhost|.*\.localhost|127\.[\d.]+|0\.0\.0\.0|\[::1\])$/.test(host)) return '';
      url.hash = ''; url.search = '';
      if (/\/index\.html$/i.test(url.pathname)) url.pathname = url.pathname.replace(/index\.html$/i, '');
      if (!url.pathname.endsWith('/')) url.pathname += '/';
      return url.href;
    } catch (_) { return ''; }
  }
  let publishedBase = publicBase(config.publicBaseUrl) || publicBase(localBase);
  signature.innerHTML = api.markup(config, localBase);
  document.querySelector('.intro').textContent = config.name + (config.title ? ' · ' + config.title : '');
  const publishing = document.getElementById('publishing');
  publishing.hidden = Boolean(publishedBase);
  document.getElementById('use-public-url').addEventListener('click', function () {
    const value = document.getElementById('public-base-url').value.trim();
    const resolved = publicBase(value);
    if (!resolved) { status.textContent = 'Enter a public HTTPS page address for the deployed signature.'; return; }
    publishedBase = resolved;
    status.textContent = 'Published address set. Copy will use the logos at that address; send a test email to confirm they load.';
  });
  document.getElementById('preview-width').addEventListener('change', function (event) {
    document.getElementById('preview-paper').dataset.previewWidth = event.target.value;
  });
  function payload() {
    if (!publishedBase) {
      status.textContent = 'Publish this folder to an HTTPS site first, or enter its published address below. Email images need public URLs.';
      document.getElementById('public-base-url').focus();
      return null;
    }
    return { html: api.markup(config, publishedBase), text: api.plainText(config) };
  }
  function copyFallback(data) {
    const helper = document.createElement('textarea');
    helper.value = data.text; helper.readOnly = true;
    helper.style.cssText = 'position:fixed;left:-9999px;top:0;';
    let handled = false;
    const previousFocus = document.activeElement;
    function onCopy(event) {
      if (!event.clipboardData) return;
      event.preventDefault();
      event.clipboardData.setData('text/html', data.html);
      event.clipboardData.setData('text/plain', data.text);
      handled = true;
    }
    document.body.appendChild(helper); helper.select();
    document.addEventListener('copy', onCopy);
    let copied = false;
    try { copied = document.execCommand('copy') && handled; } catch (_) { copied = false; }
    finally { document.removeEventListener('copy', onCopy); helper.remove(); if (previousFocus) previousFocus.focus(); }
    return copied;
  }
  document.getElementById('copy-signature').addEventListener('click', async function () {
    const data = payload(); if (!data) return;
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.write && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([data.html], { type: 'text/html' }),
          'text/plain': new Blob([data.text], { type: 'text/plain' })
        })]);
        copied = true;
      }
    } catch (_) { copied = false; }
    if (!copied) copied = copyFallback(data);
    status.textContent = copied ? 'Signature copied. Paste into Outlook’s signature editor and keep the source formatting.' : 'The browser blocked copying. Allow clipboard access and try again, or download the HTML.';
  });
  document.getElementById('download-html').addEventListener('click', function () {
    const data = payload(); if (!data) return;
    const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Europa Pharmaceuticals signature</title></head><body style="margin:0;padding:0;background:#ffffff;">' + data.html + '</body></html>';
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'europa-pharmaceuticals-signature.html';
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    status.textContent = 'HTML downloaded with public image URLs. Open it in a browser to view the signature.';
  });
}());
