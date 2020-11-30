import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";

import "../main/App.css";
import {AppUser, BaseUser} from "../data/User";
import {RootState} from "../redux/rootReducer";
import {getSortedUsers, getUsers} from "../redux/user/user.reducer";
import {ThunkDispatch} from "redux-thunk";
import {fetchUsers, postLocation} from "../redux/user/user.actions";
import {connect, ConnectedProps} from "react-redux";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ? process.env.REACT_APP_MAPBOX_ACCESS_TOKEN : '';

interface MapProps {
}

interface UserMarker {
    marker: mapboxgl.Marker,
    user: AppUser
}


type PropsFromRedux = ConnectedProps<typeof connector> & MapProps


const Map: React.FC<PropsFromRedux> = (props) => {

    const mapContainerRef = useRef<HTMLDivElement>(null);
    // const popUpRef = useRef(new mapboxgl.Popup({offset: 15}));
    const [map, setMap] = useState<mapboxgl.Map>()
    const [myMarker, setMyMarker] = useState<mapboxgl.Marker>()
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])

    // initialize map when component mounts
    useEffect(() => {

        const myMap = new mapboxgl.Map({
            container: mapContainerRef.current ? mapContainerRef.current : 'map',
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/dark-v10",
            center: [14.317141245631463, 48.33830196724644],
            zoom: 12
        });
        setMap(myMap)

        // add navigation control (zoom buttons)
        // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        // clean up on unmount
        return () => {
            if (map) map.remove();
        }
    }, []);// eslint-disable-line


    if (map) {

        // adding users to map
        for (let user of props.users) {

            let foundMarker = false;

            for (let userMarker of userMarkers) {
                if (userMarker.user._id === user._id) {
                    //user is unchecked so remove marker from array and map
                    if (!user.checked) {
                        userMarker.marker.remove()
                        setUserMarkers(userMarkers.filter(m => m.user._id !== user._id))
                        break;
                    }
                    foundMarker = true;
                    userMarker.marker.setLngLat({lng: user.longitude, lat: user.latitude})
                    break;
                }
            }
            if (!foundMarker && user.checked) {
                const popUp = new mapboxgl.Popup().setText(user.name)
                // create a marker for user
                const marker = new mapboxgl.Marker()
                    .setPopup(popUp)
                    .setLngLat({lng: user.longitude, lat: user.latitude})
                    .addTo(map)

                const userMarker:UserMarker = {
                    user: user,
                    marker: marker
                }
                // add userMarker to userMarkers
                userMarkers.push(userMarker)
                setUserMarkers(userMarkers)
            }
        }
    }

    return <div className="map" ref={mapContainerRef} id={'map'}/>;
};


const mapStateToProps = (state: RootState) => {
    return {
        users: getUsers(state.user),
        sortedUsers: getSortedUsers(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        postLocation: (baseUser: BaseUser) => dispatch(postLocation(baseUser))
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Map)
