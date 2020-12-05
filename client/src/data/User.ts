export interface AppUser extends MongoUser {
    checked: boolean
    groupID: number
    // to identify main User
    isMain:boolean
}

export interface MongoUser extends BaseUser{
    date: number
}

export interface BaseUser{
    _id: string,
    name: string,
    latitude?: number
    longitude?: number
}
