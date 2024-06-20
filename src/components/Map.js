import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Hits, SearchBox, useHits, Pagination } from 'react-instantsearch';
import { creteZoomControl } from '../utils/zoomControls';
import { createMarker } from '../utils/marker';


mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;


export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const suggestionListRef = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);
  const markersList = [];

  const closeSuggestions = (event) => {
    if (suggestionListRef.current) {
      suggestionListRef.current.style.display = 'none';
    }
  }

  const searchUsers = (query, search) => {
    if (query.length === 0) {
      suggestionListRef.current.style.display = 'none';
    }
    else if (suggestionListRef.current) {
      suggestionListRef.current.style.display = 'block';
    }
    search(query);
  };


  const DisplayHit = ( hit ) => {
    const {hits} = useHits(hit);

    markersList.forEach(m => m.remove());
  
    hits.map(user => {
      const el = createMarker(user);
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
    .setLngLat([user.location.lng, user.location.lat]).addTo(map.current);
    markersList.push(marker);
    });

    return(
      <div ref={suggestionListRef}  className='suggestion-list'>
        {
          hits.map((user) => {
            let country = user.location.country.length !== 0 ? ", " + user.location.country : "";
            return (
              <div key={user.objectID} className='suggestion-item'>
                <div className='suggestion-item-profilePic'>
                  <img src={user.photo} alt='profile'/>
                </div>
                <div className='suggestion-item-content'>
                  <div className='suggestion-item-name'>{user.fullName}</div>
                  <div className='suggestion-item-address'>{user.location.city + country}</div>
                </div>
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
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [lng, lat],
      zoom: zoom,
      renderWorldCopies: false,
      interactive: false
    });

    creteZoomControl(map);

  },[]);

  return (
    <div>
      <SearchBox  
        queryHook={searchUsers}
        onSubmit={closeSuggestions}
        placeholder={"Search Members"} 
        
      />
      <DisplayHit />
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