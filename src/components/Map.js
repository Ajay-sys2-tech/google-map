import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Hits, SearchBox, useHits, queryHook, Pagination } from 'react-instantsearch';
import { creteZoomControl } from '../utils/zoomControls';
import { createMarker } from '../utils/marker';


mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;


export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);
  // const { status } = useInstantSearch();
  let users = [];
  const markersList = [];


  const Hit = ( hit ) => {
    const {hits} = useHits(hit);
    users = [...hits];

    console.log(users);
    markersList.forEach(m => m.remove());
  
    hits.map(user => {
      const el = createMarker(user);
      const marker = new mapboxgl.Marker(el)
    .setLngLat([user.location.lng, user.location.lat]).addTo(map.current);
    markersList.push(marker);
    })
        
  }

  const Suggestions = ({users}) => {
    console.log(users);
    return(
      <div className='suggestion-list'>
        {
          users.map((user) => {
            return (
              <div key={user.objectID} className='suggestion-item'>
                <div className='suggestion-item-name'>{user.fullName}</div>
                <div className='suggestion-item-designation'>{user.designation}</div>
                <div className='suggestion-item-city'>{`${user.location.city}, ${user.location.country}`}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  useEffect( () => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: zoom,
      renderWorldCopies: false,
      interactive: false
    });


    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    creteZoomControl(map);

  },[]);

  return (
    <div>
      <SearchBox  
        classNames={{
        //  input: searching ? 'selectedInput' : '', 
          // input: status === 'loading' || status === 'stalled' ? 'selectedInput' : '',
        }} 
        // queryHook={searchUsers}
        placeholder={"Search Members"} 
      />
      <Hit />
      <div ref={mapContainer} className="map-container" />
      <Pagination 
        classNames={{
          list: 'pagination-list',
          item: 'pagination-item',
          link: 'pagination-link',
          selectedItem: 'pagination-selectedItem'
        }} 
      />
    </div>
  );
}