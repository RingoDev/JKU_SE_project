import express from 'express';
import User from '../models/User';


const router = express.Router();

//GETS BACK ALL THE USER/ENTRIES
router.get('/', (req, res) => {
    User.find().then((users) => res.json(users))
        .catch(err => res.json({message: err}))
});

//SUBMITS A USER/ENTRY
router.post('/', async (req, res) => {
    console.log("Somebody posted a user")
    // try to update existing user
    User.findOneAndUpdate({name: req.body.name}, {
        longitude: req.body.longitude,
        latitude: req.body.latitude
    }, {new: true}, (_error, doc, _result) => {
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
//SPECIFIC USER/ENTRY BY ID
// router.get('/:userId', async (req, res) => {
//     console.log("somebody tried to fetch a user")
//     try {
//         const user = await User.findById(req.params.userId);
//         res.json(user);
//     } catch (err) {
//         res.json({message: err});
//     }
// });
//
//
// //DELETE USER/ENTRY
// router.delete('/:userId', async (req, res) => {
//     try {
//         const removeUser = await User.remove({_id: req.params.userId})
//         res.json(removeUser);
//     } catch (err) {
//         res.json({message: err});
//     }
// });
//
// //UPDATE USER/ENTRY
// router.patch('/:userId', async (req, res) => {
//     try {
//         const updatedUser = await User.updateOne(
//             {_id: req.params.userId},
//             {
//                 $set: {
//                     gpsposition: req.body.gpsposition,
//                     time: Date.now
//                 }
//             }
//         );
//         res.json(updatedUser);
//     } catch (err) {
//         res.json({message: err});
//     }
// });

export default router;