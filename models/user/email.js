const userModel = require('./user')
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

module.exports.emailSenderForgotPassword = function(req, res){
    
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done){
            userModel.findOne({email: req.body.email}, function(err, user){
                if(!user){
                    req.flash('error', 'Este e-mail não está cadastrado no sistema.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                user.save(function(err){
                    done(err, token, user);
                });
            });
        },
        function(token, user, done){
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'topereira@uea.edu.br',
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'topereira@uea.edu.br',
                subject: 'Redefina sua senha - SisPeD AGIN',
                text: 'Você solicitou redefinição de senha no sistema SisPeD. ' + 
                    'Este link tem a duração de 1 hora. Após este período, será necessário solicitar outro link.\n\n' +
                    'Por favor, clique no link a seguir para redefinir sua senha:' +  '\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'Caso não tenha solicitado isto, por favor, desconsidere este e-mail.\n\n' + '\n\n' +
                    'Agência de Inovação da UEA - AGIN \n' +
                    'Universidade do Estado do Amazonas - UEA'
                    
            };
            smtpTransport.sendMail(mailOptions, function(err){
                req.flash('success', "Um e-mail foi enviado para " + user.email + ' com instruções.');
                done(err, 'done');
            });
        }
    ], function(err){
        if (err) return next (err);
        res.redirect('/forgot');
    });
}

module.exports.emailSenderResetPassword = function(req, res){
    async.waterfall([
        function(done) {
          userModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              req.flash('error', 'Link de redefinição de senha é inválido ou expirou.');
              return res.redirect('back');
            }
            if(req.body.password === req.body.confirm) {
              const salt = bcrypt.genSaltSync(SALT_FACTOR);
              const hash = bcrypt.hashSync(req.body.password, salt);
              
              user.password = hash;
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;

              user.save(function(err) {
                if(err){
                  console.log(err)
                }
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            } else {
                req.flash("error", "Senhas não conferem.");
                return res.redirect('back');
            }
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'topereira@uea.edu.br',
              pass: process.env.EMAIL_PASSWORD
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'topereira@uea.edu.br',
            subject: 'Sua senha foi alterada',
            text: 'Olá,\n\n' +
              'Esta é uma confirmação que a senha da conta ' + user.email + ' foi alterada.\n\n' + '\n\n' +
              'Agência de Inovação da UEA - AGIN \n' +
              'Universidade do Estado do Amazonas - UEA'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('success', 'Sua senha foi alterada.');
            done(err);
          });
        }
      ], function(err) {
        res.redirect('/');
      });
}