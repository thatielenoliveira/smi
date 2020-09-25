const async = require('async');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const UserModel = require('../config/database').UserModel;

module.exports.emailSenderForgotPassword = function (req, res) {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (error, buf) {
          const token = buf.toString('hex');
          done(error, token);
        });
      },
      function (token, done) {
        UserModel.findOne({ where: { email: req.body.email } }).then((user) => {
          if (!user) {
            req.flash('forgotError', 'Este e-mail não está cadastrado no sistema.');
            return res.redirect('/forgot');
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;

          user.save().then((user) => {
            done(null, token, user);
          }).catch((error) => {
            done(error, token, null);
          });
        });
      },
      function (token, user, done) {
        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });
        const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: 'Redefina sua senha',
          text: 'Você solicitou redefinição de senha no sistema SMI\n\n' +
            'Este link tem a duração de 1 hora. Após este período, será necessário solicitar outro link.\n\n' +
            'Por favor, clique no link a seguir para redefinir sua senha:' + '\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'Caso não tenha solicitado isto, por favor, desconsidere este e-mail.\n\n' + '\n\n' +

            'Sistema de Monitoramento de Idosos'

        };
        smtpTransport.sendMail(mailOptions, function (error) {
          req.flash('forgotSuccess', 'Um e-mail foi enviado para ' + user.email + ' com instruções.');
          done(error, 'done');
        });
      }
    ], function (error) {
      if (error) {
        console.error(error);
      }
      res.redirect('/forgot');
    });
}

module.exports.emailSenderResetPassword = function (req, res) {
  async.waterfall([
    function (done) {
      UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
          req.flash('error', 'Link de redefinição de senha é inválido ou expirou.');
          return res.redirect('back');
        }
        if (req.body.password === req.body.confirm) {
          const sal = bcrypt.hashSync(req.body.password, salt);

          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function (err) {
            if (err) {
              console.log(err)
            }
            req.logIn(user, function (err) {
              done(err, user);
            });
          });
        } else {
          req.flash("error", "Senhas não conferem.");
          return res.redirect('back');
        }
      });
    },
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Sua senha foi alterada',
        text: 'Olá,\n\n' +
          'Esta é uma confirmação que a senha da conta ' + user.email + ' foi alterada.\n\n' + '\n\n' +
          'Agência de Inovação da UEA - AGIN \n' +
          'Universidade do Estado do Amazonas - UEA'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('success', 'Sua senha foi alterada.');
        done(err);
      });
    }
  ], function (err) {
    res.redirect('/');
  });
}