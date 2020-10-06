const User = require('../models/user')
module.exports = (router) => {

    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, msg: 'must provid Email' })
        } else {
            if (!req.body.username) {
                res.json({ success: false, msg: 'must provid Username' })
            } else {
                if (!req.body.password) {
                    res.json({ success: false, msg: 'must provid Password' })
                } else {
                    let user = new User({
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                    });
                    // save user
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, msg: ' can not save user. Error:', err });
                            console.log(err)
                        } else {
                            res.json({ success: true, msg: ' User saved successfuly' });

                        }
                    });
                }
            }
        }
    });


    return router
}




