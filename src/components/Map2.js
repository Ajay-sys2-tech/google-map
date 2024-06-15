import ReactMapboxGl, { Marker, Layer, Feature } from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';


const Map2 = () => {
    
const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAP_ACCESS_TOKEN
  });

  return (
    <Map 
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
            height: '100vh',
            width: '100vw'
        }}
        center={[ 77.1025, 28.7041 ]}
        zoom={[3]}
    >
        <Marker
            coordinates={[28.7041, 77.1025 ]}
            anchor="bottom"
            // offsetLeft={-20}
            // offsetTop={-10}
            >
            {/* <img alt="pin" height="40px" width="30px" src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D'}/> */}
            {/* <h1>Ajay yadav</h1> */}
            {/* <div
                style={{
                height: 20,
                width: 20,
                backgroundColor: 'red',
                borderRadius: 10,
                textAlign: 'center'
                }}
            >
                <span>1</span>
            </div> */}
        </Marker>

        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            {/* <Feature coordinates={[77.1025, 28.7041]} /> */}
        </Layer>
    </Map>
  )
}

export default Map2