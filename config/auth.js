// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1031379343541602', // your App ID
        'clientSecret'    : 'f4e15edb83b394abed7a86175911f57f', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback'
    }

};
