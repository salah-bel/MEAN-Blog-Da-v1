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

                    // create user  
                    let user = new User({
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password
                    });
                    // save user
                    user.save(err => {
                        if (err) {
                            
                            if (err.code === 11000) {
                                res.json({success: false, msg: 'username or password already exist!'}) 
                            }else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.json({success: false, msg: err.errors.email.message})
                                    }else {
                                        if (err.errors.username) {
                                            res.json({success: false, msg: err.errors.username.message})
                                        }else {
                                            if (err.errors.password) {
                                                res.json({success: false, msg: err.errors.password.message})
                                            } else {
                                                res.json({success: false, msg: err})
                                            }
                                        }
                                    }
                                }
                            }
                        }else {
                            res.json({success: true, msg: 'User saved successfuly!'})
                        }
                       
                    });
                }
            }
        }
    });


    return router
}




