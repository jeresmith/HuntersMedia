
import MapView, { Marker } from 'react-native-maps';

import React, { Component } from 'react'

export class MapPage extends Component {
  render() {
    return (
      <MapView
      style={{flex: 1}}
      initialRegion={{
      latitude: 47.0073,
      longitude: -120.5363,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      }}
        showsUserLocation={true}
        mapType={'terrain'}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        moveOnMarkerPress={true}
      >
        <Marker coordinate = {{latitude: 47.00,longitude: -120.4324}}
         pinColor = {"purple"} // any color
         title={"title"}
         description={"description"}/>
      </MapView>

    )
  }
}

export default MapPage

