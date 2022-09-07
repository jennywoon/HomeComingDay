import React, { useState } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps" 

const NaverMapApi = (props) => {

    return (
        <RenderAfterNavermapsLoaded
            ncpClientId = {process.env.REACT_APP_NAVER_MAP_CLIENT_ID}
            submodules = {["geocoder"]}
        >
            <NaverMap
                mapDivId={"maps-getting-started-uncontrolled"}
                style={{width: "100%", height: "100%"}}
                center={{ lat: props.Latitude, lng: props.Longtitude}}
                defaultZoom={12}
                zoom={props.zoom}
                minZoom={12}
                enableWheelZoom={false}
            >
                <Marker
                    position={{lat: props.Latitude, lng: props.Longtitude}}
                    title={props.roadAddress}
                    clickable={true}
                />
            </NaverMap>
        </RenderAfterNavermapsLoaded>
    );
};

export default NaverMapApi;