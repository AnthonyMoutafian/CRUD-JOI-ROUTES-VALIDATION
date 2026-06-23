const joi = require("joi");

const schema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),

  age: joi.number().integer().min(18).max(65),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
})

module.exports.schema = schema