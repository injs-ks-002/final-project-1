const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .trim()
            .required()
            .label("email must be email format, dont just spaces, and not empty"),

        password: Joi.string()
            .required()
            .trim()
            .min(6)
            .label("password must be minimum 6 length, dont just spaces, and not empty")
    })

    const {error} = schema.validate(req.body)

    if (error) {
        return res.status(422).send({
            "status": 422,
            "message": error.details.map(x => x.context.label).join(', ')
        })
    } else {
        next()
    }
}