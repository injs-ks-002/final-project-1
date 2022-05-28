const Joi = require('joi')

exports.validation = (req, res, next) => {
    const schema = Joi.object({
        success: Joi.string()
            .required()
            .label("success must be string and not empty"),

        low_point: Joi.string()
            .required()
            .label("low_point must be string and not empty"),

        take_away: Joi.string()
            .required()
            .label("take_away must be string and not empty")
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