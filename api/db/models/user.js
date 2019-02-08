const mongoose = require('mongoose');
const crypto = require('crypto');
//const jwtConfig = require('jwt_config');
/*
const userSchema = new mongoose.Schema({

    login: {
        type: String,
        required: [true, 'login is required'],
        unique: [true, 'login may be unique']
    },
    passwordHash: {
        type: String,
        required: [true, 'password is required']
    },
    email: {
        type: String,
        required: [true,'E-mail is required'],
        unique: [true, 'email has already exists']
    },
    salt: {
        type:String,
    },
    /!*permissions:[{
        addParts: {
            type: Boolean,
            default: false,
        },
        addContractPrinter:{
            type: Boolean,
            default: false,
        },
        updateContractPrinterCounters:{
            type: Boolean,
            default: false,
        },
        userRegistration:{
            type: Boolean,
            default: false,
        },
        updateUSerPermissions:{
            type: Boolean,
            default: false,
        },
        newCartridgeRepair:{
            type: Boolean,
            default: false,
        },
        newPrinterRepair:{
            type: Boolean,
            default: false,
        },
        comingPartsAdd:{
            type: Boolean,
            default: false,
        },
        consumptionPartsAdd:{
            type:Boolean,
            default: false,
        }
    }],*!/
},{
    timestamps: true
});

userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })

    .get(function () {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
*/

const userSchema = new mongoose.Schema({
  displayName: String,
  email: {
    type: String,
    required: 'Укажите e-mail',
    unique: 'Такой e-mail уже существует',
  },
  passwordHash: String,
  salt: String,
  forgotPasswordKey: {
    type: String,
    default: null,
  }
  },
  {
    timestamps: true,
  },
);

// TODO: сделать соль рандомной
const salt = "]>ew+K@Z/-BU9rwxO=ZdT8b!ikg)lb!)-R/P)}@p2^x?5;wIGcav^J]7LW_f+%/1MqM7Zp:oWE;uD'rf`%duo!JD1{u^CF:-X<@SUI7|:yV5`Y/'-^sxt58ngvfBbY)vXId!HX|AA=,Rm3uFrt/'Vt$!O=M%9E)DdeX>Hh%c[h/p;Q&0OK6&?`9@@y{`oCj";
//const salt = jwtConfig.salt;


userSchema.virtual('password').set(function (password) {
  this._plainPassword = password;
  if (password) {
    this.passwordHash = crypto.pbkdf2Sync(password, salt, 1, 256, 'sha512').toString();
  } else {
    this.salt = undefined;
    this.passwordHash = undefined;
  }
})

  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, salt, 1, 256, 'sha512').toString() === this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);
