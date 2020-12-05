import UserModel from "./models/User";
import {Document} from "mongoose"
import {User} from "./data";


/**
 * Creates a User and returns a Promise that resolves to the Userobject
 * Should only be called if the Name doesn't exist in the DB yet
 * @param name the name of the user
 */
export function createUser(name: string) {
    return new Promise<User>((resolve, reject) => {
        new UserModel({
            name: name,
            date: Date.now()
        })
            .save()
            .then(value => {
                console.log("Saved New User to DB", value);
                const user: User | undefined = docToUser(value);
                if (!user) reject("Invalid Document");
                else resolve(user);

            })
            .catch(err => {
                console.log("Couldn't save User to DB", err)
                reject(err)
            });
    });
}

/**
 * Updates a User with certain id in DB
 * @param user
 */
export function updateUser(user: User) {
    return new Promise<User>((resolve, reject) => {
        UserModel.findOneAndUpdate({_id: user._id}, {
                date: Date.now(),
                longitude: user.longitude,
                latitude: user.latitude,
                name: user.name
            },
            {new: true},
            (_error, doc: Document | null, _result) => {
                console.log(_error)
                console.log(doc)
                console.log(_result)
                if (doc === null) {
                    console.log("User didn't exist in the DB");
                    reject("User didn't exist in the DB")
                } else {
                    console.log("Updated User to", doc);
                    const user: User | undefined = docToUser(doc);
                    if (!user) reject("Invalid Document");
                    else resolve(user);
                }
            })
    })
}

export function removeUser(id: string) {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndRemove(id)
    })
}

export function getAllUsers() {
    return new Promise<User[]>((resolve, reject) => {
        UserModel.find()
            .then((docs: Document[]) => {
                const result: User[] = [];
                for (let doc of docs) {
                    const user = docToUser(doc)
                    if (user) {
                        result.push(user);
                    }
                }
                resolve(result)
            })
            .catch((err) => reject(err))
    })
}

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

function docToUser(doc: any): User | undefined {
    if (doc.name && doc._id) {
        return {
            name: doc.name,
            _id: doc._id,
            latitude: doc.latitude,
            longitude: doc.longitude
        }
    } else return
}