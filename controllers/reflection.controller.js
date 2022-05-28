const db = require('../config/db')
const jwt = require('jsonwebtoken')
const {
    privateKey
} = require('../middleware/authentication')

exports.postReflectionUser = async (req, res) => {
    const id = req.id
    const body = req.body

    await db.query(`INSERT INTO reflections (
        success, low_point, take_away, owner_id
    ) VALUES ('${body.success}', '${body.low_point}', '${body.take_away}', '${id}')`
    ).then(() => {
        db.query(`SELECT * FROM reflections 
        WHERE owner_id = '${id}' ORDER BY modified_date DESC`)
        .then(results => {
            res.status(201).send(results.rows[0])
        })
    }).catch(err => {
        console.log(err)
        res.status(503).json({
            "status": "Failed",
            "message": "Failed for add reflection data"
        })
    })
}

exports.getReflectionUser = async (req, res) => {
    const id = req.id

    await db.query(`SELECT * FROM reflections 
    WHERE owner_id = '${id}' ORDER BY modified_date DESC`)
        .then(results => {
            if (results.rows.length == 0) {
                res.status(404).send({
                    status: 404,
                    message: 'Reflection data is not found'
                })
            } else {
                res.status(200).send(results.rows)
            }
        }).catch(err => {
            console.log(err)
            res.status(503).json({
                "status": "Failed",
                "message": "Failed for get reflection data"
            })
        })
}

exports.putReflectionUser = async (req, res) => {
    const userId = req.id
    const id = req.params.id
    const body = req.body

    await db.query(`UPDATE reflections SET success = '${body.success}', 
    low_point = '${body.low_point}', take_away = '${body.take_away}' 
    WHERE id = '${id}' AND owner_id = '${userId}'`)
        .then(result => {
            if (result.rows.length == 0) {
                return res.status(404).send({
                    status: 404,
                    message: `Reflection by id '${id}' is not found`
                })
            } else {
                db.query(`SELECT * FROM reflections WHERE id = '${id}' AND owner_id = '${userId}' 
                ORDER BY modified_date DESC`)
                .then(results => {
                    res.status(200).send(results.rows[0])
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(503).json({
                "status": "Failed",
                "message": "Failed for update reflection data"
            })
        })
}

exports.deleteReflectionUser = async (req, res) => {
    const userId = req.id
    const id = req.params.id

    await db.query(`DELETE FROM reflections WHERE id = '${id}' AND owner_id = '${userId}'`)
    .then(results => {
        if (results.rows.length == 0) {
            return res.status(404).send({
                status: 404,
                message: `Reflection by id '${id}' is not found`
            })
        } else {
            res.status(200).json({
                "message": "Succesfully deleted reflection data"
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(503).json({
            "status": "Failed",
            "message": "Failed for delete reflection data"
        })
    })
}