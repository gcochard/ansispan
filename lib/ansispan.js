var ansispan = function (str) {
  Object.keys(ansispan.foregroundColors).forEach(function (ansi) {
    var span = '<span style="color: ' + ansispan.foregroundColors[ansi] + '">';

    //
    // `\033[Xm` == `\033[0;Xm` sets foreground color to `X`.
    //

    str = str.replace(
      new RegExp('\x1b\\[' + ansi + 'm', 'g'),
      span
    ).replace(
      new RegExp('\x1b\\[0;' + ansi + 'm', 'g'),
      span
    );
  });
  //
  // `\033[1m` enables bold font, `\033[22m` disables it
  //
  str = str.replace(/\x1b\[1m/g, '<span style="font-weight: bold;">').replace(/\x1b\[22m/g, '</span>');

  //
  // `\033[3m` enables italics font, `\033[23m` disables it
  //
  str = str.replace(/\x1b\[3m/g, '<span style="font-style: italic;">').replace(/\x1b\[23m/g, '</span>');

  str = str.replace(/\x1b\[m/g, '</span>');
  str = str.replace(/\x1b\[0m/g, '</span>');
  str = str.replace(/\x1b\[39m/g, '</span>');
  // adding \033[99m as a disabling ansi sequence per http://www.masswerk.at/termlib/sample_ansi_mapping.html
  return str.replace(/\x1b\[99m/g, '</span>');
};

ansispan.foregroundColors = {
  '30': 'black',
  '31': 'red',
  '32': 'green',
  '33': 'yellow',
  '34': 'blue',
  '35': 'purple',
  '36': 'cyan',
  '37': 'white',
  '90': '#646464',
  '91': '#FFF0F0',
  '92': '#F0FFF0',
  '93': '#FFFFF0',
  '94': '#F0F0FF',
  '95': '#FFF0FF',
  '96': '#F0FFFF',
  '97': '#FFFFFF'
};

if (module !== undefined && module.exports) {
  module.exports = ansispan;
}

