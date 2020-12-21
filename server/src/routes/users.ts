import express from 'express';
import UserModel from '../models/User';

const router = express.Router();

//GETS BACK ALL THE USER/ENTRIES
router.get('/', (req, res) => {
    UserModel.find().then((users) => {
        res.json(users)
    })
        .catch(err => res.json({message: err}))

});

export default router;