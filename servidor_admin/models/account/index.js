
const db = require('../../../connectionbd')
const md5 = require('md5')
module.exports = {
    login: (params, callback) => {
        db.query('SELECT * FROM account where username = $1', [params.username.toUpperCase()], (err, r) => {
            if (err) {
                return callback(err, undefined)
            }
            var account = r.rowCount > 0 ? r.rows[0] : undefined
            if (account != undefined) {
                if (account.password == md5(params.password+'_08')) {
                    account["password"] = ''
                    callback(err, account)
                }else{
                    callback('Verifique sus datos', undefined)    
                }
            } else {
                callback('No existe este usuario', undefined)
            }
        })
    },
    //...More functions
}