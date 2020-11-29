import React, {useEffect} from "react";
import {User} from "./App";
import "./Users.css"

// axios with baseURL set
import axios from "./axios";

interface UsersProps {
    setUsers: (users: User[]) => void
    fetchInterval: number
    users: User[]
    username: string
    location?: GeolocationPosition
}

const Users: React.FC<UsersProps> = (props) => {

    const getUsers = () => {
        axios.get('/users')
            .then(res => {
                const users: User[] = []
                for (let doc of res.data) {
                    if (validateDocument(doc)) {
                        users.push({
                            name: doc.name,
                            position: {
                                latitude: doc.latitude,
                                longitude: doc.longitude
                            }
                        })
                    }
                    props.setUsers(users)
                }
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error + ' Fehler! Code: ' + error.staus);
            })
    }

    const postLocation = () => {

        console.log(props)
        const userData = {
            name: props.username,
            latitude: props.location?.coords.latitude,
            longitude: props.location?.coords.longitude
        }
        axios.post('/users', userData)
            .then(res => {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error + ' Fehler! Code: ' + error.staus);
            })
    }

    useEffect(() => {
        getUsers()
        postLocation()
        const interval = setInterval(() => {
            // will run every fetchInterval/1000 seconds
            // do a get request and a post request
            getUsers()
            postLocation()
        }, props.fetchInterval);
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [])// eslint-disable-line
    return (
        <>
            <ul className="collection">
                <li className="collection-item avatar">
                    <i className="material-icons circle green">insert_chart</i>
                    <span className="title">{props.username}</span>
                    <p>First Line <br/>
                        Second Line
                    </p>
                    <a href="#" className="secondary-content"><i className="material-icons">grade</i></a>
                </li>

                {props.users.map((user, idx) => {
                    if (user.name === props.username) return (<></>)
                    return (
                        <li key={idx}>
                            <div>
                                <i className="material-icons circle red">insert_chart</i>
                                <span className="title">{user.name}</span>
                                <p>First Line <br/>
                                    Second Line
                                </p>
                                <a href="#" className="secondary-content"><i className="material-icons">grade</i></a>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

function validateDocument(doc: any) {
    if (doc.latitude === undefined || doc.longitude === undefined || doc.name === undefined) return false;
    if (typeof doc.latitude !== "number" || typeof doc.longitude !== "number") return false;
    if (doc.latitude < -90 || doc.latitude > 90) return false;
    if (doc.longitude < -180 || doc.latitude > 180) return false;
    return true
}

export default Users;