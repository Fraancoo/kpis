const router = require('express').Router();

const users = [{
    id: 1,
    name: 'Admin',
    email: 'admin@admin.com',
    password: '12345',
    type: 0
},
{
    id: 2,
    name: 'Chalan',
    email: 'user1@gmail.com',
    password: '123',
    type: 1
}];

//Get users
router.get('/',(req, res)=>{
    if (users.length > 0) {
        res.json({
            status: 1,
            users: users
        });
    } else {
        res.json({
            status: 0,
            message: 'Error, not users found'
        });
    }
});

//Get one user
router.get('/:id',(req, res)=>{
    const {id} = req.params
    users.forEach(user => {
        if (user.id === id) {
            res.json({
                status: 1,
                user: user
            });
        } else {
            res.json({
                status: 0,
                message: 'Error, user ID not found'
            });
        }
    });
});

//Login
router.post('/login',(req, res)=>{
    const user =  req;
    if (user.email === users.email) {
        if (user.password === users.password) {
            res.json({
                status: 1,
                message: 'Login successfully',
                token: 'token12345'
            });
        }
    } else {
        res.json({
            status: 0,
            message: 'Error, email or password are not correct'
        });
    }
});

module.exports = router;