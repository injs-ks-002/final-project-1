const db = require("../config/db");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const generateToken = require("../middleware/authentication").generateToken;

exports.signup = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    try {
        await db.query("SELECT * FROM users WHERE email = $1", [email], (err, user) => {
            if (user.rows.length) {
                return res.status(409).json({
                    message: "email already exist",
                });
            } else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                db.query(
                    "INSERT INTO users (email, password) values($1, $2)", [email, hash],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                           return res.status(400).json({
                               "status": 400,
                               "message": "Failed for register account"
                           });
                        } else {
                            db.query("SELECT * FROM users WHERE email = $1", [email], (err, users) => {
                                let id = users.rows.map(data => data.id).join(", ")
                                const token = generateToken({
                                    id: parseInt(id),
                                    email: email,
                                });
                                res.status(201).json({
                                    email: email,
                                    token: token,
                                });
                            })
                        }
                    }
                );
            }
        });
    } catch(err) {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    }
};
exports.signIn = async(req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    try {
        await db.query(
            "SELECT * FROM users WHERE email = $1", [email],
            (err, user) => {
                if (!user.rows.length) {
                    return res.status(404).json({
                        message: "email not found",
                    });
                }
                let userPassword, user_id, user_email;
                user.rows.forEach((userr) => {
                    userPassword = userr.password;
                    user_id = userr.id;
                    user_email = userr.email;
                });
                const isValid = bcrypt.compareSync(password, userPassword);
                if (!isValid) {
                    return res.status(403).send({
                        message: "email and password not match",
                    });
                }
                const token = generateToken({
                    id: user_id,
                    email: user_email,
                });
                res.status(200).send({
                    token: token
                });
            }
        );
    } catch(err) {
        console.log(err)
        res.status(503).send({
            status: 503,
            message: 'Internal server error'
        })
    }
};