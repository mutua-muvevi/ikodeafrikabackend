const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken")
const config = require("config")

// the tuitor Schema 
const tuitorSchema = new Schema({
	firstname: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true,
	},
	lastname: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	email: {
		type: String,
		unique: true,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	picture: {
		type: String,
		minLength: 5,
		maxLength: 100,
		required: true
	},
	age: {
		type: Number,
		min: 10,
		max: 200,
		required: true,
	},
	city: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	country: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	telephone: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 2000,
	}, 
	date: {
		type: Date,
		default: Date.now
	},
	istuitor: {
		type: Boolean,
		default: true
	}
	// link to the course schema
},
{
	timestamps: true
})

// crerating the token method
tuitorSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
	  {
		_id: this._id,
		name: this.name,
		email: this.email,
		istuitor: this.istuitor
	  },
	  config.get("jwtPrivateKey")
	);
	return token;
};


// creating the model
const Tuitor = mongoose.model("tuitors", tuitorSchema)

// validation
const validate = (tuitor) => {
	const schema = Joi.object({
		firstname: Joi.string().min(3).max(100).required(),
		lastname: Joi.string().min(3).max(100).required(),
		email: Joi.string().min(3).max(100).required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] }}),
		picture: Joi.string().min(3).max(100).required(),
		age: Joi.number().min(10).max(200).required(),
		city: Joi.string().min(3).max(100).required(),
		country: Joi.string().min(3).max(100).required(),
		telephone: Joi.string().min(3).max(100).required(),
		istuitor: Joi.boolean().required(),
		password: Joi.string().min(6).max(100).required(),
	})

	return schema.validate(tuitor)
}

// exports
module.exports.Tuitor = Tuitor
module.exports.validate = validate