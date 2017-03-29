let jwt = require('jsonwebtoken');

function verify(req, res) {
  let user = {};
  
  let token = jwt.sign({
    data: user
  }, 'lokesh', { expiresIn: 60 * 60 });
  
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
}

module.exports.verify = verify;