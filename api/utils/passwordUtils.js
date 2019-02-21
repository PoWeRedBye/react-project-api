const crypto = require('crypto');

exports.hashNewPassword = async password => {
  try {
    const salt =
      "]>ew+K@Z/-BU9rwxO=ZdT8b!ikg)lb!)-R/P)}@p2^x?5;wIGcav^J]7LW_f+%/1MqM7Zp:oWE;uD'rf`%duo!JD1{u^CF:-X<@SUI7|:yV5`Y/'-^sxt58ngvfBbY)vXId!HX|AA=,Rm3uFrt/'Vt$!O=M%9E)DdeX>Hh%c[h/p;Q&0OK6&?`9@@y{`oCj";
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1, 256, 'sha512').toString();
    return passwordHash;
  } catch (error) {
    my_logger(error);
  }
};
