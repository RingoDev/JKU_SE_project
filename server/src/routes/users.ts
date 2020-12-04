import express from 'express';
import User from '../models/User';


const router = express.Router();

//GETS BACK ALL THE USER/ENTRIES
router.get('/', (req, res) => {
    User.find().then((users) => {
        res.json(users)
    })
        .catch(err => res.json({message: err}))

});

//SUBMITS A USER/ENTRY
router.post('/', async (req, res) => {
    console.log("Somebody posted a user")

    const date = Date.now()

    console.log("Updating user to time:" + date)
    // try to update existing user
    User.findOneAndUpdate({name: req.body.name}, {
        date: date,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    }, {new: true}, (_error, doc, _result) => {
        console.log("Updated user to ", doc)
        // if there was no user with the name -> create User
        if (doc === null) {
            const newUser = new User({
                name: req.body.name,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            })
            newUser.save()
                .then(value => res.json(value))
                .catch(err => res.json({message: err}))
        } else {
            res.json(doc)
        }
    })
});

export function getTestUsers() {
    const users = []

    users.push({
        name: "Testuser1",
        latitude: 48.33830196724644,
        longitude: 14.317141245631463,
    })
    users.push({
        name: "Testuser2",
        latitude: 48.34406412842475,
        longitude: 14.305296611071041,
    })
    users.push({
        name: "Testuser3",
        latitude: 48.31627424066361,
        longitude: 14.312077235203457
    })
    return users
}

export default router;