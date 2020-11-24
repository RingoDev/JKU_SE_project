import React from 'react';
interface  MarkerProps{
    id:number
}
const Marker = (props:MarkerProps) => <div id={`marker-`+props.id} className="marker" />;

export default Marker;