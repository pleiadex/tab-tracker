const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user) {
    const SALT_FACTOR = 8
    // console.log(`before hashing: ${user.password}`)
    
    if (!user.changed('password')) {
        return ;
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataType) => {
    const User = sequelize.define('User', {
        email: {
            type: DataType.STRING,
            unique: true
        },
        password: DataType.STRING
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            // beforeSave: hashPassword,
        }
    })
    User.prototype.comparePassword = function (password) {
        // console.log(`user pw ${password}`)
        // console.log(`db pw ${this.password}`)
        return bcrypt.compareAsync(password, this.password)
    }
    return User
}
