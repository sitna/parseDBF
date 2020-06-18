module.exports = createDecoder;
var regexIso = /^(8\d{3})\-{0,1}(\d{0,1})$/m;
var regex = /^(?:ASNI\s)?(\d{0,4})$/m;
function createDecoder(encoding) {
  if (!encoding) {
    encoding='ISO-8859-1';
  }
  try {
    new TextDecoder(encoding.trim());
  } catch(e) {
    var match = regex.exec(encoding);
    if (match) {
      encoding = 'windows-' + match[1];
    }
	match = regexIso.exec(encoding);
	if (match) {
      encoding = 'ISO-' + match[1]+ '-' + match[2];
    }
  }
  return browserDecoder;
  function browserDecoder(buffer) {
    var decoder = new TextDecoder(encoding);
    var out = decoder.decode(buffer, {
      stream: true
    }) + decoder.decode();
    return out.replace(/\0/g, '').trim();
  }
}
