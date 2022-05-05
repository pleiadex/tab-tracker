const Joi = require('joi')
// middle ware function

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email': 
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password': 
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. Only lower case, upper case, numeric is allowed.
                        <br>
                        2. Minimum 8, Maximum 32 length is required.
                        `
                    })
                    break

                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }

        } else {
            next()
        }
    }
}