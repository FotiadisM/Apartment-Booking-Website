import React from "react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

const style = {
  width: "500px",
  height: "500px",
};

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        center={{
          lat: 40.854885,
          lng: -88.081807,
        }}
        zoom={15}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_GOOGLE,
}))(MapContainer);
