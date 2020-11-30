export interface AppUser extends MongoUser {
    checked: boolean
    groupID: number
    // to identify main User
    isMain:boolean
}

export interface MongoUser extends BaseUser{
    _id: string,
    date: number
    name: string,
    latitude: number
    longitude: number
}

export interface BaseUser{
    name: string,
    latitude: number
    longitude: number
}
