import React from "react";

interface PopupProps {
    feature: any
}

const Popup: React.FC<PopupProps> = (props: PopupProps) => {
    const {id, name, description} = props.feature.properties;

    return (
        <div id={`popup-${id}`}>
            <h3>{name}</h3>
            {description}
        </div>
    );
};

// @ts-ignore
export default Popup;