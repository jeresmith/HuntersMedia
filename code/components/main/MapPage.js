
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import {View, Image} from 'react-native'

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
        clusterColor={'#006400'}
      >
        <Marker coordinate = {{latitude: 47.00,longitude: -120.500}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 1" }
         />
         <Marker coordinate = {{latitude: 47.005,longitude: -120.500}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 2" }
         />
         <Marker coordinate = {{latitude: 47.02,longitude: -120.500}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 3" }
         />
         <Marker coordinate = {{latitude: 47.01,longitude: -120.500}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 4" }
         />
         <Marker coordinate = {{latitude: 46.5971,longitude: -120.34226}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 5" }
         />
         <Marker coordinate = {{latitude: 46.58,longitude: -120.34226}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 6" }
         />
        <Marker coordinate = {{latitude: 46.6,longitude: -120.34226}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 7" }
         />
         <Marker coordinate = {{latitude: 47.0,longitude: -120.6}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 8" }
         />
         <Marker coordinate = {{latitude: 47.01,longitude: -120.61}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 9" }
         />
         <Marker coordinate = {{latitude: 47.06,longitude: -120.58}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 10" }
         />
         <Marker coordinate = {{latitude: 47.07,longitude: -120.57}}
         pinColor = {"#006400"} // any color
         title={"User: lanceTest"}
         description={"test 10" }
         />
      </MapView>

    )
  }
}

export default MapPage

