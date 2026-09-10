(function (root) {
  'use strict';
  const disclaimer = 'This email and any files transmitted with it are confidential and intended solely for the use of the individual or entity to whom they are addressed. If you have received this email in error, please notify the system manager. This message contains confidential information and is intended only for the individual named. If you are not the named addressee, you should not disseminate, distribute or copy this e-mail. Please notify the sender immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.';
  const esc = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const tableStyle = 'width:100%;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;';
  const tableOpen = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${tableStyle}">`;
  function webUrl(value) {
    if (!value) return '';
    try { const url = new URL(/^https?:\/\//i.test(value) ? value : 'https://' + value); return /^https?:$/.test(url.protocol) ? url.href : ''; }
    catch (_) { return ''; }
  }
  function contacts(config) {
    const items = [];
    if (config.mobile) items.push({ label: 'Mobile', value: config.mobile, href: 'tel:' + config.mobile.replace(/[^+\d]/g, '') });
    if (config.whatsapp) items.push({ label: 'WhatsApp', value: config.whatsapp, href: 'https://wa.me/' + config.whatsapp.replace(/\D/g, '') });
    if (config.email) items.push({ label: 'Email', value: config.email, href: 'mailto:' + config.email });
    if (config.website && webUrl(config.website)) items.push({ label: 'Web', value: config.website.replace(/^https?:\/\//i, '').replace(/\/$/, ''), href: webUrl(config.website) });
    if (config.office) items.push({ label: 'Office', value: config.office, href: '' });
    return items;
  }
  function contactCell(item, isLeft, isLastRow, single) {
    const width = single ? '100%' : '50%';
    const value = `<span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#172541;overflow-wrap:anywhere;word-wrap:break-word;">${esc(item.value)}</span>`;
    return `<td width="${width}"${single ? ' colspan="2"' : ''} valign="top" style="width:${width};padding:12px 16px;${isLeft && !single ? 'border-right:1px solid #e4dfd2;' : ''}${isLastRow ? '' : 'border-bottom:1px solid #e4dfd2;'}">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;line-height:12px;letter-spacing:1.7px;color:#74603b;font-weight:bold;text-transform:uppercase;">${esc(item.label)}</div>
      <div style="padding-top:3px;">${item.href ? `<a href="${esc(item.href)}" style="color:#172541;text-decoration:none;">${value}</a>` : value}</div>
    </td>`;
  }
  function markup(config, assetBase) {
    const base = new URL('./', assetBase.endsWith('/') ? assetBase : assetBase + '/');
    const imageUrl = filename => esc(new URL('assets/' + filename, base).href);
    const groupUrl = esc(webUrl(config.groupUrl) || 'https://www.boranco.eu/');
    const companyUrl = webUrl(config.website);
    const emblem = `<img src="${imageUrl('europa-emblem.png')}" alt="${esc(config.company)}" width="68" height="69" style="display:block;width:68px;height:69px;border:0;outline:none;text-decoration:none;">`;
    const list = contacts(config);
    let contactRows = '';
    for (let i = 0; i < list.length; i += 2) {
      const last = i + 2 >= list.length;
      contactRows += '<tr>' + contactCell(list[i], true, last, !list[i + 1]) + (list[i + 1] ? contactCell(list[i + 1], false, last, false) : '') + '</tr>';
    }
    return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${tableStyle}table-layout:fixed;">
      <tbody>
        <tr><td style="padding:0 0 14px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${tableStyle}table-layout:fixed;">
            <tbody><tr>
              <td width="18%" style="width:18%;border-top:1px solid #dcd6c9;font-size:0;line-height:0;">&#8203;</td>
              <td width="19%" style="width:19%;border-top:2px solid #b6944e;font-size:0;line-height:0;">&#8203;</td>
              <td width="7%" style="width:7%;border-top:2px solid #172541;font-size:0;line-height:0;">&#8203;</td>
              <td width="56%" style="width:56%;border-top:1px solid #dcd6c9;font-size:0;line-height:0;">&#8203;</td>
            </tr></tbody>
          </table>
        </td></tr>
        <tr><td bgcolor="#ffffff" style="background-color:#ffffff;">
          ${tableOpen}<tbody><tr>
            <td width="84" valign="middle" style="width:84px;padding:2px 16px 16px 0;">${companyUrl ? `<a href="${esc(companyUrl)}" style="text-decoration:none;">${emblem}</a>` : emblem}</td>
            <td valign="middle" style="padding:0 0 16px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:34px;color:#172541;letter-spacing:.4px;">Europa</div>
              <div style="padding-top:3px;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#826a3d;letter-spacing:2.2px;text-transform:uppercase;">Pharmaceuticals</div>
            </td>
          </tr></tbody></table>
        </td></tr>
        <tr><td bgcolor="#172541" style="background-color:#172541;border-top:1px solid #b6944e;border-bottom:1px solid #b6944e;padding:17px 18px 18px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:29px;color:#f3e9cf;letter-spacing:.8px;">${esc(config.name)}</div>
          ${config.title ? `<div style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:15px;color:#dfceaa;letter-spacing:1.5px;text-transform:uppercase;">${esc(config.title)}</div>` : ''}
        </td></tr>
        ${contactRows ? `<tr><td style="padding-top:9px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f8f6f1" style="${tableStyle}table-layout:fixed;background-color:#f8f6f1;"><tbody>${contactRows}</tbody></table>
        </td></tr>` : ''}
        <tr><td style="padding:16px 0 12px;border-bottom:1px solid #e4dfd2;">
          ${tableOpen}<tbody><tr>
            <td width="52" valign="middle" style="width:52px;padding:0 12px 0 0;">
              <a href="${groupUrl}" style="text-decoration:none;"><img src="${imageUrl('boranco-crest.png')}" alt="Boran&amp;Co coat of arms" width="40" height="38" style="display:block;width:40px;height:38px;border:0;outline:none;"></a>
            </td>
            <td valign="middle" style="padding:0;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:18px;color:#66523e;">A member of <a href="${groupUrl}" style="color:#76362f;text-decoration:none;">${esc(config.groupName)}</a></div>
              <div style="padding-top:2px;font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:13px;letter-spacing:.5px;"><a href="${groupUrl}" style="color:#5f6670;text-decoration:none;">${esc((webUrl(config.groupUrl) || 'https://www.boranco.eu/').replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, ''))}</a></div>
            </td>
          </tr></tbody></table>
        </td></tr>
        <tr><td style="padding-top:12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;line-height:15px;color:#66717a;letter-spacing:.15px;text-align:left;">${disclaimer}</td></tr>
      </tbody>
    </table>`;
  }
  function plainText(config) {
    return [config.company, config.name, config.title, ...contacts(config).map(item => item.label + ': ' + item.value), 'A member of ' + config.groupName + ' — ' + config.groupUrl, '', disclaimer].filter(value => value !== undefined && value !== null).join('\n');
  }
  root.EuropaSignature = { markup, plainText, disclaimer };
}(window));
